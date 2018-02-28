const fs = require('fs');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const postcssUrl = require('postcss-url');
const cssnano = require('cssnano');
const customProperties = require('postcss-custom-properties');

const { NoEmitOnErrorsPlugin, SourceMapDevToolPlugin, NamedModulesPlugin } = require('webpack');
const { NamedLazyChunksWebpackPlugin, BaseHrefWebpackPlugin } = require('@angular/cli/plugins/webpack');
const { CommonsChunkPlugin } = require('webpack').optimize;
const { AngularCompilerPlugin } = require('@ngtools/webpack');

const nodeModules = path.join(process.cwd(), 'node_modules');
const realNodeModules = fs.realpathSync(nodeModules);
const genDirNodeModules = path.join(process.cwd(), 'src', '$$_gendir', 'node_modules');
const entryPoints = ["inline","polyfills","sw-register","styles","vendor","main"];
const minimizeCss = false;
const baseHref = "";
const deployUrl = "";
const postcssPlugins = function () {
        // safe settings based on: https://github.com/ben-eb/cssnano/issues/358#issuecomment-283696193
        const importantCommentRe = /@preserve|@license|[@#]\s*source(?:Mapping)?URL|^!/i;
        const minimizeOptions = {
            autoprefixer: false,
            safe: true,
            mergeLonghand: false,
            discardComments: { remove: (comment) => !importantCommentRe.test(comment) }
        };
        return [
            postcssUrl({
                url: (URL) => {
                    // Only convert root relative URLs, which CSS-Loader won't process into require().
                    if (!URL.startsWith('/') || URL.startsWith('//')) {
                        return URL;
                    }
                    if (deployUrl.match(/:\/\//)) {
                        // If deployUrl contains a scheme, ignore baseHref use deployUrl as is.
                        return `${deployUrl.replace(/\/$/, '')}${URL}`;
                    }
                    else if (baseHref.match(/:\/\//)) {
                        // If baseHref contains a scheme, include it as is.
                        return baseHref.replace(/\/$/, '') +
                            `/${deployUrl}/${URL}`.replace(/\/\/+/g, '/');
                    }
                    else {
                        // Join together base-href, deploy-url and the original URL.
                        // Also dedupe multiple slashes into single ones.
                        return `/${baseHref}/${deployUrl}/${URL}`.replace(/\/\/+/g, '/');
                    }
                }
            }),
            autoprefixer(),
            customProperties({ preserve: true })
        ].concat(minimizeCss ? [cssnano(minimizeOptions)] : []);
    };




module.exports = {
  "resolve": {
    "extensions": [
      ".ts",
      ".js"
    ],
    "modules": [
      "./node_modules",
      "./node_modules"
    ],
    "symlinks": true,
    "alias": {
      "rxjs/util/tryCatch": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/util/tryCatch.js",
      "rxjs/util/toSubscriber": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/util/toSubscriber.js",
      "rxjs/util/subscribeToResult": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/util/subscribeToResult.js",
      "rxjs/util/root": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/util/root.js",
      "rxjs/util/pipe": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/util/pipe.js",
      "rxjs/util/not": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/util/not.js",
      "rxjs/util/noop": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/util/noop.js",
      "rxjs/util/isScheduler": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/util/isScheduler.js",
      "rxjs/util/isPromise": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/util/isPromise.js",
      "rxjs/util/isObject": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/util/isObject.js",
      "rxjs/util/isNumeric": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/util/isNumeric.js",
      "rxjs/util/isFunction": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/util/isFunction.js",
      "rxjs/util/isDate": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/util/isDate.js",
      "rxjs/util/isArrayLike": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/util/isArrayLike.js",
      "rxjs/util/isArray": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/util/isArray.js",
      "rxjs/util/identity": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/util/identity.js",
      "rxjs/util/errorObject": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/util/errorObject.js",
      "rxjs/util/assign": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/util/assign.js",
      "rxjs/util/applyMixins": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/util/applyMixins.js",
      "rxjs/util/UnsubscriptionError": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/util/UnsubscriptionError.js",
      "rxjs/util/TimeoutError": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/util/TimeoutError.js",
      "rxjs/util/Set": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/util/Set.js",
      "rxjs/util/ObjectUnsubscribedError": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/util/ObjectUnsubscribedError.js",
      "rxjs/util/MapPolyfill": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/util/MapPolyfill.js",
      "rxjs/util/Map": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/util/Map.js",
      "rxjs/util/Immediate": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/util/Immediate.js",
      "rxjs/util/FastMap": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/util/FastMap.js",
      "rxjs/util/EmptyError": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/util/EmptyError.js",
      "rxjs/util/ArgumentOutOfRangeError": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/util/ArgumentOutOfRangeError.js",
      "rxjs/util/AnimationFrame": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/util/AnimationFrame.js",
      "rxjs/testing/TestScheduler": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/testing/TestScheduler.js",
      "rxjs/testing/TestMessage": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/testing/TestMessage.js",
      "rxjs/testing/SubscriptionLoggable": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/testing/SubscriptionLoggable.js",
      "rxjs/testing/SubscriptionLog": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/testing/SubscriptionLog.js",
      "rxjs/testing/HotObservable": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/testing/HotObservable.js",
      "rxjs/testing/ColdObservable": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/testing/ColdObservable.js",
      "rxjs/symbol/rxSubscriber": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/symbol/rxSubscriber.js",
      "rxjs/symbol/observable": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/symbol/observable.js",
      "rxjs/symbol/iterator": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/symbol/iterator.js",
      "rxjs/scheduler/queue": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/scheduler/queue.js",
      "rxjs/scheduler/async": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/scheduler/async.js",
      "rxjs/scheduler/asap": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/scheduler/asap.js",
      "rxjs/scheduler/animationFrame": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/scheduler/animationFrame.js",
      "rxjs/scheduler/VirtualTimeScheduler": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/scheduler/VirtualTimeScheduler.js",
      "rxjs/scheduler/QueueScheduler": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/scheduler/QueueScheduler.js",
      "rxjs/scheduler/QueueAction": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/scheduler/QueueAction.js",
      "rxjs/scheduler/AsyncScheduler": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/scheduler/AsyncScheduler.js",
      "rxjs/scheduler/AsyncAction": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/scheduler/AsyncAction.js",
      "rxjs/scheduler/AsapScheduler": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/scheduler/AsapScheduler.js",
      "rxjs/scheduler/AsapAction": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/scheduler/AsapAction.js",
      "rxjs/scheduler/AnimationFrameScheduler": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/scheduler/AnimationFrameScheduler.js",
      "rxjs/scheduler/AnimationFrameAction": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/scheduler/AnimationFrameAction.js",
      "rxjs/scheduler/Action": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/scheduler/Action.js",
      "rxjs/operators/zipAll": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/zipAll.js",
      "rxjs/operators/zip": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/zip.js",
      "rxjs/operators/withLatestFrom": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/withLatestFrom.js",
      "rxjs/operators/windowWhen": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/windowWhen.js",
      "rxjs/operators/windowToggle": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/windowToggle.js",
      "rxjs/operators/windowTime": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/windowTime.js",
      "rxjs/operators/windowCount": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/windowCount.js",
      "rxjs/operators/window": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/window.js",
      "rxjs/operators/toArray": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/toArray.js",
      "rxjs/operators/timestamp": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/timestamp.js",
      "rxjs/operators/timeoutWith": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/timeoutWith.js",
      "rxjs/operators/timeout": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/timeout.js",
      "rxjs/operators/timeInterval": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/timeInterval.js",
      "rxjs/operators/throttleTime": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/throttleTime.js",
      "rxjs/operators/throttle": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/throttle.js",
      "rxjs/operators/tap": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/tap.js",
      "rxjs/operators/takeWhile": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/takeWhile.js",
      "rxjs/operators/takeUntil": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/takeUntil.js",
      "rxjs/operators/takeLast": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/takeLast.js",
      "rxjs/operators/take": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/take.js",
      "rxjs/operators/switchMapTo": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/switchMapTo.js",
      "rxjs/operators/switchMap": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/switchMap.js",
      "rxjs/operators/switchAll": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/switchAll.js",
      "rxjs/operators/subscribeOn": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/subscribeOn.js",
      "rxjs/operators/startWith": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/startWith.js",
      "rxjs/operators/skipWhile": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/skipWhile.js",
      "rxjs/operators/skipUntil": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/skipUntil.js",
      "rxjs/operators/skipLast": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/skipLast.js",
      "rxjs/operators/skip": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/skip.js",
      "rxjs/operators/single": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/single.js",
      "rxjs/operators/shareReplay": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/shareReplay.js",
      "rxjs/operators/share": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/share.js",
      "rxjs/operators/sequenceEqual": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/sequenceEqual.js",
      "rxjs/operators/scan": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/scan.js",
      "rxjs/operators/sampleTime": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/sampleTime.js",
      "rxjs/operators/sample": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/sample.js",
      "rxjs/operators/retryWhen": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/retryWhen.js",
      "rxjs/operators/retry": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/retry.js",
      "rxjs/operators/repeatWhen": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/repeatWhen.js",
      "rxjs/operators/repeat": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/repeat.js",
      "rxjs/operators/refCount": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/refCount.js",
      "rxjs/operators/reduce": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/reduce.js",
      "rxjs/operators/race": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/race.js",
      "rxjs/operators/publishReplay": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/publishReplay.js",
      "rxjs/operators/publishLast": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/publishLast.js",
      "rxjs/operators/publishBehavior": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/publishBehavior.js",
      "rxjs/operators/publish": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/publish.js",
      "rxjs/operators/pluck": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/pluck.js",
      "rxjs/operators/partition": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/partition.js",
      "rxjs/operators/pairwise": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/pairwise.js",
      "rxjs/operators/onErrorResumeNext": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/onErrorResumeNext.js",
      "rxjs/operators/observeOn": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/observeOn.js",
      "rxjs/operators/multicast": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/multicast.js",
      "rxjs/operators/min": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/min.js",
      "rxjs/operators/mergeScan": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/mergeScan.js",
      "rxjs/operators/mergeMapTo": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/mergeMapTo.js",
      "rxjs/operators/mergeMap": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/mergeMap.js",
      "rxjs/operators/mergeAll": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/mergeAll.js",
      "rxjs/operators/merge": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/merge.js",
      "rxjs/operators/max": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/max.js",
      "rxjs/operators/materialize": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/materialize.js",
      "rxjs/operators/mapTo": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/mapTo.js",
      "rxjs/operators/map": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/map.js",
      "rxjs/operators/last": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/last.js",
      "rxjs/operators/isEmpty": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/isEmpty.js",
      "rxjs/operators/ignoreElements": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/ignoreElements.js",
      "rxjs/operators/groupBy": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/groupBy.js",
      "rxjs/operators/first": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/first.js",
      "rxjs/operators/findIndex": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/findIndex.js",
      "rxjs/operators/find": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/find.js",
      "rxjs/operators/finalize": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/finalize.js",
      "rxjs/operators/filter": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/filter.js",
      "rxjs/operators/expand": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/expand.js",
      "rxjs/operators/exhaustMap": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/exhaustMap.js",
      "rxjs/operators/exhaust": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/exhaust.js",
      "rxjs/operators/every": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/every.js",
      "rxjs/operators/elementAt": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/elementAt.js",
      "rxjs/operators/distinctUntilKeyChanged": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/distinctUntilKeyChanged.js",
      "rxjs/operators/distinctUntilChanged": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/distinctUntilChanged.js",
      "rxjs/operators/distinct": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/distinct.js",
      "rxjs/operators/dematerialize": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/dematerialize.js",
      "rxjs/operators/delayWhen": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/delayWhen.js",
      "rxjs/operators/delay": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/delay.js",
      "rxjs/operators/defaultIfEmpty": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/defaultIfEmpty.js",
      "rxjs/operators/debounceTime": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/debounceTime.js",
      "rxjs/operators/debounce": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/debounce.js",
      "rxjs/operators/count": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/count.js",
      "rxjs/operators/concatMapTo": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/concatMapTo.js",
      "rxjs/operators/concatMap": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/concatMap.js",
      "rxjs/operators/concatAll": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/concatAll.js",
      "rxjs/operators/concat": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/concat.js",
      "rxjs/operators/combineLatest": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/combineLatest.js",
      "rxjs/operators/combineAll": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/combineAll.js",
      "rxjs/operators/catchError": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/catchError.js",
      "rxjs/operators/bufferWhen": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/bufferWhen.js",
      "rxjs/operators/bufferToggle": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/bufferToggle.js",
      "rxjs/operators/bufferTime": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/bufferTime.js",
      "rxjs/operators/bufferCount": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/bufferCount.js",
      "rxjs/operators/buffer": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/buffer.js",
      "rxjs/operators/auditTime": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/auditTime.js",
      "rxjs/operators/audit": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators/audit.js",
      "rxjs/operators": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operators.js",
      "rxjs/operator/zipAll": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/zipAll.js",
      "rxjs/operator/zip": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/zip.js",
      "rxjs/operator/withLatestFrom": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/withLatestFrom.js",
      "rxjs/operator/windowWhen": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/windowWhen.js",
      "rxjs/operator/windowToggle": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/windowToggle.js",
      "rxjs/operator/windowTime": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/windowTime.js",
      "rxjs/operator/windowCount": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/windowCount.js",
      "rxjs/operator/window": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/window.js",
      "rxjs/operator/toPromise": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/toPromise.js",
      "rxjs/operator/toArray": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/toArray.js",
      "rxjs/operator/timestamp": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/timestamp.js",
      "rxjs/operator/timeoutWith": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/timeoutWith.js",
      "rxjs/operator/timeout": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/timeout.js",
      "rxjs/operator/timeInterval": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/timeInterval.js",
      "rxjs/operator/throttleTime": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/throttleTime.js",
      "rxjs/operator/throttle": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/throttle.js",
      "rxjs/operator/takeWhile": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/takeWhile.js",
      "rxjs/operator/takeUntil": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/takeUntil.js",
      "rxjs/operator/takeLast": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/takeLast.js",
      "rxjs/operator/take": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/take.js",
      "rxjs/operator/switchMapTo": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/switchMapTo.js",
      "rxjs/operator/switchMap": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/switchMap.js",
      "rxjs/operator/switch": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/switch.js",
      "rxjs/operator/subscribeOn": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/subscribeOn.js",
      "rxjs/operator/startWith": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/startWith.js",
      "rxjs/operator/skipWhile": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/skipWhile.js",
      "rxjs/operator/skipUntil": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/skipUntil.js",
      "rxjs/operator/skipLast": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/skipLast.js",
      "rxjs/operator/skip": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/skip.js",
      "rxjs/operator/single": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/single.js",
      "rxjs/operator/shareReplay": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/shareReplay.js",
      "rxjs/operator/share": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/share.js",
      "rxjs/operator/sequenceEqual": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/sequenceEqual.js",
      "rxjs/operator/scan": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/scan.js",
      "rxjs/operator/sampleTime": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/sampleTime.js",
      "rxjs/operator/sample": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/sample.js",
      "rxjs/operator/retryWhen": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/retryWhen.js",
      "rxjs/operator/retry": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/retry.js",
      "rxjs/operator/repeatWhen": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/repeatWhen.js",
      "rxjs/operator/repeat": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/repeat.js",
      "rxjs/operator/reduce": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/reduce.js",
      "rxjs/operator/race": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/race.js",
      "rxjs/operator/publishReplay": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/publishReplay.js",
      "rxjs/operator/publishLast": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/publishLast.js",
      "rxjs/operator/publishBehavior": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/publishBehavior.js",
      "rxjs/operator/publish": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/publish.js",
      "rxjs/operator/pluck": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/pluck.js",
      "rxjs/operator/partition": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/partition.js",
      "rxjs/operator/pairwise": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/pairwise.js",
      "rxjs/operator/onErrorResumeNext": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/onErrorResumeNext.js",
      "rxjs/operator/observeOn": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/observeOn.js",
      "rxjs/operator/multicast": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/multicast.js",
      "rxjs/operator/min": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/min.js",
      "rxjs/operator/mergeScan": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/mergeScan.js",
      "rxjs/operator/mergeMapTo": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/mergeMapTo.js",
      "rxjs/operator/mergeMap": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/mergeMap.js",
      "rxjs/operator/mergeAll": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/mergeAll.js",
      "rxjs/operator/merge": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/merge.js",
      "rxjs/operator/max": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/max.js",
      "rxjs/operator/materialize": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/materialize.js",
      "rxjs/operator/mapTo": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/mapTo.js",
      "rxjs/operator/map": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/map.js",
      "rxjs/operator/let": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/let.js",
      "rxjs/operator/last": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/last.js",
      "rxjs/operator/isEmpty": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/isEmpty.js",
      "rxjs/operator/ignoreElements": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/ignoreElements.js",
      "rxjs/operator/groupBy": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/groupBy.js",
      "rxjs/operator/first": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/first.js",
      "rxjs/operator/findIndex": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/findIndex.js",
      "rxjs/operator/find": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/find.js",
      "rxjs/operator/finally": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/finally.js",
      "rxjs/operator/filter": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/filter.js",
      "rxjs/operator/expand": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/expand.js",
      "rxjs/operator/exhaustMap": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/exhaustMap.js",
      "rxjs/operator/exhaust": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/exhaust.js",
      "rxjs/operator/every": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/every.js",
      "rxjs/operator/elementAt": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/elementAt.js",
      "rxjs/operator/do": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/do.js",
      "rxjs/operator/distinctUntilKeyChanged": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/distinctUntilKeyChanged.js",
      "rxjs/operator/distinctUntilChanged": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/distinctUntilChanged.js",
      "rxjs/operator/distinct": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/distinct.js",
      "rxjs/operator/dematerialize": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/dematerialize.js",
      "rxjs/operator/delayWhen": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/delayWhen.js",
      "rxjs/operator/delay": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/delay.js",
      "rxjs/operator/defaultIfEmpty": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/defaultIfEmpty.js",
      "rxjs/operator/debounceTime": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/debounceTime.js",
      "rxjs/operator/debounce": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/debounce.js",
      "rxjs/operator/count": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/count.js",
      "rxjs/operator/concatMapTo": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/concatMapTo.js",
      "rxjs/operator/concatMap": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/concatMap.js",
      "rxjs/operator/concatAll": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/concatAll.js",
      "rxjs/operator/concat": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/concat.js",
      "rxjs/operator/combineLatest": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/combineLatest.js",
      "rxjs/operator/combineAll": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/combineAll.js",
      "rxjs/operator/catch": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/catch.js",
      "rxjs/operator/bufferWhen": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/bufferWhen.js",
      "rxjs/operator/bufferToggle": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/bufferToggle.js",
      "rxjs/operator/bufferTime": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/bufferTime.js",
      "rxjs/operator/bufferCount": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/bufferCount.js",
      "rxjs/operator/buffer": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/buffer.js",
      "rxjs/operator/auditTime": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/auditTime.js",
      "rxjs/operator/audit": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/operator/audit.js",
      "rxjs/observable/zip": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/observable/zip.js",
      "rxjs/observable/using": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/observable/using.js",
      "rxjs/observable/timer": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/observable/timer.js",
      "rxjs/observable/throw": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/observable/throw.js",
      "rxjs/observable/range": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/observable/range.js",
      "rxjs/observable/race": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/observable/race.js",
      "rxjs/observable/pairs": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/observable/pairs.js",
      "rxjs/observable/onErrorResumeNext": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/observable/onErrorResumeNext.js",
      "rxjs/observable/of": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/observable/of.js",
      "rxjs/observable/never": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/observable/never.js",
      "rxjs/observable/merge": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/observable/merge.js",
      "rxjs/observable/interval": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/observable/interval.js",
      "rxjs/observable/if": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/observable/if.js",
      "rxjs/observable/generate": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/observable/generate.js",
      "rxjs/observable/fromPromise": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/observable/fromPromise.js",
      "rxjs/observable/fromEventPattern": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/observable/fromEventPattern.js",
      "rxjs/observable/fromEvent": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/observable/fromEvent.js",
      "rxjs/observable/from": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/observable/from.js",
      "rxjs/observable/forkJoin": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/observable/forkJoin.js",
      "rxjs/observable/empty": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/observable/empty.js",
      "rxjs/observable/dom/webSocket": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/observable/dom/webSocket.js",
      "rxjs/observable/dom/ajax": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/observable/dom/ajax.js",
      "rxjs/observable/dom/WebSocketSubject": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/observable/dom/WebSocketSubject.js",
      "rxjs/observable/dom/AjaxObservable": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/observable/dom/AjaxObservable.js",
      "rxjs/observable/defer": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/observable/defer.js",
      "rxjs/observable/concat": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/observable/concat.js",
      "rxjs/observable/combineLatest": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/observable/combineLatest.js",
      "rxjs/observable/bindNodeCallback": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/observable/bindNodeCallback.js",
      "rxjs/observable/bindCallback": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/observable/bindCallback.js",
      "rxjs/observable/UsingObservable": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/observable/UsingObservable.js",
      "rxjs/observable/TimerObservable": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/observable/TimerObservable.js",
      "rxjs/observable/SubscribeOnObservable": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/observable/SubscribeOnObservable.js",
      "rxjs/observable/ScalarObservable": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/observable/ScalarObservable.js",
      "rxjs/observable/RangeObservable": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/observable/RangeObservable.js",
      "rxjs/observable/PromiseObservable": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/observable/PromiseObservable.js",
      "rxjs/observable/PairsObservable": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/observable/PairsObservable.js",
      "rxjs/observable/NeverObservable": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/observable/NeverObservable.js",
      "rxjs/observable/IteratorObservable": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/observable/IteratorObservable.js",
      "rxjs/observable/IntervalObservable": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/observable/IntervalObservable.js",
      "rxjs/observable/IfObservable": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/observable/IfObservable.js",
      "rxjs/observable/GenerateObservable": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/observable/GenerateObservable.js",
      "rxjs/observable/FromObservable": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/observable/FromObservable.js",
      "rxjs/observable/FromEventPatternObservable": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/observable/FromEventPatternObservable.js",
      "rxjs/observable/FromEventObservable": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/observable/FromEventObservable.js",
      "rxjs/observable/ForkJoinObservable": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/observable/ForkJoinObservable.js",
      "rxjs/observable/ErrorObservable": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/observable/ErrorObservable.js",
      "rxjs/observable/EmptyObservable": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/observable/EmptyObservable.js",
      "rxjs/observable/DeferObservable": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/observable/DeferObservable.js",
      "rxjs/observable/ConnectableObservable": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/observable/ConnectableObservable.js",
      "rxjs/observable/BoundNodeCallbackObservable": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/observable/BoundNodeCallbackObservable.js",
      "rxjs/observable/BoundCallbackObservable": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/observable/BoundCallbackObservable.js",
      "rxjs/observable/ArrayObservable": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/observable/ArrayObservable.js",
      "rxjs/observable/ArrayLikeObservable": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/observable/ArrayLikeObservable.js",
      "rxjs/interfaces": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/interfaces.js",
      "rxjs/add/operator/zipAll": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/zipAll.js",
      "rxjs/add/operator/zip": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/zip.js",
      "rxjs/add/operator/withLatestFrom": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/withLatestFrom.js",
      "rxjs/add/operator/windowWhen": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/windowWhen.js",
      "rxjs/add/operator/windowToggle": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/windowToggle.js",
      "rxjs/add/operator/windowTime": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/windowTime.js",
      "rxjs/add/operator/windowCount": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/windowCount.js",
      "rxjs/add/operator/window": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/window.js",
      "rxjs/add/operator/toPromise": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/toPromise.js",
      "rxjs/add/operator/toArray": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/toArray.js",
      "rxjs/add/operator/timestamp": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/timestamp.js",
      "rxjs/add/operator/timeoutWith": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/timeoutWith.js",
      "rxjs/add/operator/timeout": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/timeout.js",
      "rxjs/add/operator/timeInterval": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/timeInterval.js",
      "rxjs/add/operator/throttleTime": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/throttleTime.js",
      "rxjs/add/operator/throttle": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/throttle.js",
      "rxjs/add/operator/takeWhile": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/takeWhile.js",
      "rxjs/add/operator/takeUntil": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/takeUntil.js",
      "rxjs/add/operator/takeLast": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/takeLast.js",
      "rxjs/add/operator/take": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/take.js",
      "rxjs/add/operator/switchMapTo": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/switchMapTo.js",
      "rxjs/add/operator/switchMap": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/switchMap.js",
      "rxjs/add/operator/switch": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/switch.js",
      "rxjs/add/operator/subscribeOn": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/subscribeOn.js",
      "rxjs/add/operator/startWith": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/startWith.js",
      "rxjs/add/operator/skipWhile": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/skipWhile.js",
      "rxjs/add/operator/skipUntil": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/skipUntil.js",
      "rxjs/add/operator/skipLast": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/skipLast.js",
      "rxjs/add/operator/skip": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/skip.js",
      "rxjs/add/operator/single": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/single.js",
      "rxjs/add/operator/shareReplay": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/shareReplay.js",
      "rxjs/add/operator/share": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/share.js",
      "rxjs/add/operator/sequenceEqual": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/sequenceEqual.js",
      "rxjs/add/operator/scan": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/scan.js",
      "rxjs/add/operator/sampleTime": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/sampleTime.js",
      "rxjs/add/operator/sample": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/sample.js",
      "rxjs/add/operator/retryWhen": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/retryWhen.js",
      "rxjs/add/operator/retry": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/retry.js",
      "rxjs/add/operator/repeatWhen": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/repeatWhen.js",
      "rxjs/add/operator/repeat": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/repeat.js",
      "rxjs/add/operator/reduce": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/reduce.js",
      "rxjs/add/operator/race": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/race.js",
      "rxjs/add/operator/publishReplay": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/publishReplay.js",
      "rxjs/add/operator/publishLast": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/publishLast.js",
      "rxjs/add/operator/publishBehavior": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/publishBehavior.js",
      "rxjs/add/operator/publish": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/publish.js",
      "rxjs/add/operator/pluck": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/pluck.js",
      "rxjs/add/operator/partition": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/partition.js",
      "rxjs/add/operator/pairwise": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/pairwise.js",
      "rxjs/add/operator/onErrorResumeNext": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/onErrorResumeNext.js",
      "rxjs/add/operator/observeOn": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/observeOn.js",
      "rxjs/add/operator/multicast": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/multicast.js",
      "rxjs/add/operator/min": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/min.js",
      "rxjs/add/operator/mergeScan": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/mergeScan.js",
      "rxjs/add/operator/mergeMapTo": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/mergeMapTo.js",
      "rxjs/add/operator/mergeMap": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/mergeMap.js",
      "rxjs/add/operator/mergeAll": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/mergeAll.js",
      "rxjs/add/operator/merge": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/merge.js",
      "rxjs/add/operator/max": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/max.js",
      "rxjs/add/operator/materialize": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/materialize.js",
      "rxjs/add/operator/mapTo": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/mapTo.js",
      "rxjs/add/operator/map": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/map.js",
      "rxjs/add/operator/let": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/let.js",
      "rxjs/add/operator/last": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/last.js",
      "rxjs/add/operator/isEmpty": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/isEmpty.js",
      "rxjs/add/operator/ignoreElements": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/ignoreElements.js",
      "rxjs/add/operator/groupBy": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/groupBy.js",
      "rxjs/add/operator/first": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/first.js",
      "rxjs/add/operator/findIndex": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/findIndex.js",
      "rxjs/add/operator/find": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/find.js",
      "rxjs/add/operator/finally": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/finally.js",
      "rxjs/add/operator/filter": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/filter.js",
      "rxjs/add/operator/expand": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/expand.js",
      "rxjs/add/operator/exhaustMap": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/exhaustMap.js",
      "rxjs/add/operator/exhaust": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/exhaust.js",
      "rxjs/add/operator/every": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/every.js",
      "rxjs/add/operator/elementAt": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/elementAt.js",
      "rxjs/add/operator/do": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/do.js",
      "rxjs/add/operator/distinctUntilKeyChanged": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/distinctUntilKeyChanged.js",
      "rxjs/add/operator/distinctUntilChanged": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/distinctUntilChanged.js",
      "rxjs/add/operator/distinct": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/distinct.js",
      "rxjs/add/operator/dematerialize": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/dematerialize.js",
      "rxjs/add/operator/delayWhen": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/delayWhen.js",
      "rxjs/add/operator/delay": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/delay.js",
      "rxjs/add/operator/defaultIfEmpty": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/defaultIfEmpty.js",
      "rxjs/add/operator/debounceTime": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/debounceTime.js",
      "rxjs/add/operator/debounce": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/debounce.js",
      "rxjs/add/operator/count": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/count.js",
      "rxjs/add/operator/concatMapTo": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/concatMapTo.js",
      "rxjs/add/operator/concatMap": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/concatMap.js",
      "rxjs/add/operator/concatAll": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/concatAll.js",
      "rxjs/add/operator/concat": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/concat.js",
      "rxjs/add/operator/combineLatest": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/combineLatest.js",
      "rxjs/add/operator/combineAll": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/combineAll.js",
      "rxjs/add/operator/catch": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/catch.js",
      "rxjs/add/operator/bufferWhen": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/bufferWhen.js",
      "rxjs/add/operator/bufferToggle": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/bufferToggle.js",
      "rxjs/add/operator/bufferTime": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/bufferTime.js",
      "rxjs/add/operator/bufferCount": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/bufferCount.js",
      "rxjs/add/operator/buffer": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/buffer.js",
      "rxjs/add/operator/auditTime": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/auditTime.js",
      "rxjs/add/operator/audit": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/operator/audit.js",
      "rxjs/add/observable/zip": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/observable/zip.js",
      "rxjs/add/observable/using": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/observable/using.js",
      "rxjs/add/observable/timer": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/observable/timer.js",
      "rxjs/add/observable/throw": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/observable/throw.js",
      "rxjs/add/observable/range": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/observable/range.js",
      "rxjs/add/observable/race": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/observable/race.js",
      "rxjs/add/observable/pairs": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/observable/pairs.js",
      "rxjs/add/observable/onErrorResumeNext": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/observable/onErrorResumeNext.js",
      "rxjs/add/observable/of": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/observable/of.js",
      "rxjs/add/observable/never": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/observable/never.js",
      "rxjs/add/observable/merge": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/observable/merge.js",
      "rxjs/add/observable/interval": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/observable/interval.js",
      "rxjs/add/observable/if": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/observable/if.js",
      "rxjs/add/observable/generate": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/observable/generate.js",
      "rxjs/add/observable/fromPromise": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/observable/fromPromise.js",
      "rxjs/add/observable/fromEventPattern": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/observable/fromEventPattern.js",
      "rxjs/add/observable/fromEvent": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/observable/fromEvent.js",
      "rxjs/add/observable/from": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/observable/from.js",
      "rxjs/add/observable/forkJoin": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/observable/forkJoin.js",
      "rxjs/add/observable/empty": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/observable/empty.js",
      "rxjs/add/observable/dom/webSocket": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/observable/dom/webSocket.js",
      "rxjs/add/observable/dom/ajax": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/observable/dom/ajax.js",
      "rxjs/add/observable/defer": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/observable/defer.js",
      "rxjs/add/observable/concat": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/observable/concat.js",
      "rxjs/add/observable/combineLatest": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/observable/combineLatest.js",
      "rxjs/add/observable/bindNodeCallback": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/observable/bindNodeCallback.js",
      "rxjs/add/observable/bindCallback": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/add/observable/bindCallback.js",
      "rxjs/Subscription": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/Subscription.js",
      "rxjs/Subscriber": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/Subscriber.js",
      "rxjs/SubjectSubscription": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/SubjectSubscription.js",
      "rxjs/Subject": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/Subject.js",
      "rxjs/Scheduler": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/Scheduler.js",
      "rxjs/Rx": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/Rx.js",
      "rxjs/ReplaySubject": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/ReplaySubject.js",
      "rxjs/OuterSubscriber": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/OuterSubscriber.js",
      "rxjs/Operator": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/Operator.js",
      "rxjs/Observer": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/Observer.js",
      "rxjs/Observable": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/Observable.js",
      "rxjs/Notification": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/Notification.js",
      "rxjs/InnerSubscriber": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/InnerSubscriber.js",
      "rxjs/BehaviorSubject": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/BehaviorSubject.js",
      "rxjs/AsyncSubject": "/Users/tkmagesh/Documents/Training/Fidelity-Angular4-Dec-2017/bug-tracker-app-routing-new/node_modules/rxjs/_esm5/AsyncSubject.js"
    },
    "mainFields": [
      "browser",
      "module",
      "main"
    ]
  },
  "resolveLoader": {
    "modules": [
      "./node_modules",
      "./node_modules"
    ]
  },
  "entry": {
    "main": [
      "./src/main.ts"
    ],
    "polyfills": [
      "./src/polyfills.ts"
    ],
    "styles": [
      "./src/styles.css"
    ]
  },
  "output": {
    "path": path.join(process.cwd(), "dist"),
    "filename": "[name].bundle.js",
    "chunkFilename": "[id].chunk.js",
    "crossOriginLoading": false
  },
  "module": {
    "rules": [
      {
        "test": /\.html$/,
        "loader": "raw-loader"
      },
      {
        "test": /\.(eot|svg|cur)$/,
        "loader": "file-loader",
        "options": {
          "name": "[name].[hash:20].[ext]",
          "limit": 10000
        }
      },
      {
        "test": /\.(jpg|png|webp|gif|otf|ttf|woff|woff2|ani)$/,
        "loader": "url-loader",
        "options": {
          "name": "[name].[hash:20].[ext]",
          "limit": 10000
        }
      },
      {
        "exclude": [
          path.join(process.cwd(), "src/styles.css")
        ],
        "test": /\.css$/,
        "use": [
          "exports-loader?module.exports.toString()",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          }
        ]
      },
      {
        "exclude": [
          path.join(process.cwd(), "src/styles.css")
        ],
        "test": /\.scss$|\.sass$/,
        "use": [
          "exports-loader?module.exports.toString()",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          },
          {
            "loader": "sass-loader",
            "options": {
              "sourceMap": false,
              "precision": 8,
              "includePaths": []
            }
          }
        ]
      },
      {
        "exclude": [
          path.join(process.cwd(), "src/styles.css")
        ],
        "test": /\.less$/,
        "use": [
          "exports-loader?module.exports.toString()",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          },
          {
            "loader": "less-loader",
            "options": {
              "sourceMap": false
            }
          }
        ]
      },
      {
        "exclude": [
          path.join(process.cwd(), "src/styles.css")
        ],
        "test": /\.styl$/,
        "use": [
          "exports-loader?module.exports.toString()",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          },
          {
            "loader": "stylus-loader",
            "options": {
              "sourceMap": false,
              "paths": []
            }
          }
        ]
      },
      {
        "include": [
          path.join(process.cwd(), "src/styles.css")
        ],
        "test": /\.css$/,
        "use": [
          "style-loader",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          }
        ]
      },
      {
        "include": [
          path.join(process.cwd(), "src/styles.css")
        ],
        "test": /\.scss$|\.sass$/,
        "use": [
          "style-loader",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          },
          {
            "loader": "sass-loader",
            "options": {
              "sourceMap": false,
              "precision": 8,
              "includePaths": []
            }
          }
        ]
      },
      {
        "include": [
          path.join(process.cwd(), "src/styles.css")
        ],
        "test": /\.less$/,
        "use": [
          "style-loader",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          },
          {
            "loader": "less-loader",
            "options": {
              "sourceMap": false
            }
          }
        ]
      },
      {
        "include": [
          path.join(process.cwd(), "src/styles.css")
        ],
        "test": /\.styl$/,
        "use": [
          "style-loader",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          },
          {
            "loader": "stylus-loader",
            "options": {
              "sourceMap": false,
              "paths": []
            }
          }
        ]
      },
      {
        "test": /\.ts$/,
        "loader": "@ngtools/webpack"
      }
    ]
  },
  "plugins": [
    new NoEmitOnErrorsPlugin(),
    new CopyWebpackPlugin([
      {
        "context": "src",
        "to": "",
        "from": {
          "glob": "assets/**/*",
          "dot": true
        }
      },
      {
        "context": "src",
        "to": "",
        "from": {
          "glob": "favicon.ico",
          "dot": true
        }
      }
    ], {
      "ignore": [
        ".gitkeep"
      ],
      "debug": "warning"
    }),
    new ProgressPlugin(),
    new CircularDependencyPlugin({
      "exclude": /(\\|\/)node_modules(\\|\/)/,
      "failOnError": false
    }),
    new NamedLazyChunksWebpackPlugin(),
    new HtmlWebpackPlugin({
      "template": "./src/index.html",
      "filename": "./index.html",
      "hash": false,
      "inject": true,
      "compile": true,
      "favicon": false,
      "minify": false,
      "cache": true,
      "showErrors": true,
      "chunks": "all",
      "excludeChunks": [],
      "title": "Webpack App",
      "xhtml": true,
      "chunksSortMode": function sort(left, right) {
        let leftIndex = entryPoints.indexOf(left.names[0]);
        let rightindex = entryPoints.indexOf(right.names[0]);
        if (leftIndex > rightindex) {
            return 1;
        }
        else if (leftIndex < rightindex) {
            return -1;
        }
        else {
            return 0;
        }
    }
    }),
    new BaseHrefWebpackPlugin({}),
    new CommonsChunkPlugin({
      "name": [
        "inline"
      ],
      "minChunks": null
    }),
    new CommonsChunkPlugin({
      "name": [
        "vendor"
      ],
      "minChunks": (module) => {
                return module.resource
                    && (module.resource.startsWith(nodeModules)
                        || module.resource.startsWith(genDirNodeModules)
                        || module.resource.startsWith(realNodeModules));
            },
      "chunks": [
        "main"
      ]
    }),
    new SourceMapDevToolPlugin({
      "filename": "[file].map[query]",
      "moduleFilenameTemplate": "[resource-path]",
      "fallbackModuleFilenameTemplate": "[resource-path]?[hash]",
      "sourceRoot": "webpack:///"
    }),
    new CommonsChunkPlugin({
      "name": [
        "main"
      ],
      "minChunks": 2,
      "async": "common"
    }),
    new NamedModulesPlugin({}),
    new AngularCompilerPlugin({
      "mainPath": "main.ts",
      "platform": 0,
      "hostReplacementPaths": {
        "environments/environment.ts": "environments/environment.ts"
      },
      "sourceMap": true,
      "tsConfigPath": "src/tsconfig.app.json",
      "skipCodeGeneration": true,
      "compilerOptions": {}
    })
  ],
  "node": {
    "fs": "empty",
    "global": true,
    "crypto": "empty",
    "tls": "empty",
    "net": "empty",
    "process": true,
    "module": false,
    "clearImmediate": false,
    "setImmediate": false
  },
  "devServer": {
    "historyApiFallback": true
  }
};
