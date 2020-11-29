import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@tmp/history';
import RendererWrapper0 from '/Users/mac/Desktop/WebUI/briup/day05/ej/src/pages/.umi/LocaleWrapper.jsx';
import _dvaDynamic from 'dva/dynamic';

const Router = require('dva/router').routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/user',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__UserLayout" */ '../../layouts/UserLayout'),
          LoadingComponent: require('/Users/mac/Desktop/WebUI/briup/day05/ej/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/UserLayout').default,
    routes: [
      {
        path: '/user',
        redirect: '/user/login',
        exact: true,
      },
      {
        path: '/user/login',
        name: 'login',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__User__models__register.js' */ '/Users/mac/Desktop/WebUI/briup/day05/ej/src/pages/User/models/register.js').then(
                  m => {
                    return { namespace: 'register', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__User__Login" */ '../User/Login'),
              LoadingComponent: require('/Users/mac/Desktop/WebUI/briup/day05/ej/src/components/PageLoading/index')
                .default,
            })
          : require('../User/Login').default,
        exact: true,
      },
      {
        path: '/user/register',
        name: 'register',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__User__models__register.js' */ '/Users/mac/Desktop/WebUI/briup/day05/ej/src/pages/User/models/register.js').then(
                  m => {
                    return { namespace: 'register', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__User__Register" */ '../User/Register'),
              LoadingComponent: require('/Users/mac/Desktop/WebUI/briup/day05/ej/src/components/PageLoading/index')
                .default,
            })
          : require('../User/Register').default,
        exact: true,
      },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__User__models__register.js' */ '/Users/mac/Desktop/WebUI/briup/day05/ej/src/pages/User/models/register.js').then(
                  m => {
                    return { namespace: 'register', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__User__RegisterResult" */ '../User/RegisterResult'),
              LoadingComponent: require('/Users/mac/Desktop/WebUI/briup/day05/ej/src/components/PageLoading/index')
                .default,
            })
          : require('../User/RegisterResult').default,
        exact: true,
      },
      {
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__404" */ '../404'),
              LoadingComponent: require('/Users/mac/Desktop/WebUI/briup/day05/ej/src/components/PageLoading/index')
                .default,
            })
          : require('../404').default,
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('/Users/mac/Desktop/WebUI/briup/day05/ej/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    path: '/',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__BasicLayout" */ '../../layouts/BasicLayout'),
          LoadingComponent: require('/Users/mac/Desktop/WebUI/briup/day05/ej/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/BasicLayout').default,
    Routes: [require('../Authorized').default],
    routes: [
      {
        path: '/',
        redirect: '/dashboard/analysis',
        authority: ['admin', 'user'],
        exact: true,
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        routes: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__Dashboard__models__activities.js' */ '/Users/mac/Desktop/WebUI/briup/day05/ej/src/pages/Dashboard/models/activities.js').then(
                      m => {
                        return { namespace: 'activities', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Dashboard__models__chart.js' */ '/Users/mac/Desktop/WebUI/briup/day05/ej/src/pages/Dashboard/models/chart.js').then(
                      m => {
                        return { namespace: 'chart', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Dashboard__models__monitor.js' */ '/Users/mac/Desktop/WebUI/briup/day05/ej/src/pages/Dashboard/models/monitor.js').then(
                      m => {
                        return { namespace: 'monitor', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__Dashboard__Analysis" */ '../Dashboard/Analysis'),
                  LoadingComponent: require('/Users/mac/Desktop/WebUI/briup/day05/ej/src/components/PageLoading/index')
                    .default,
                })
              : require('../Dashboard/Analysis').default,
            exact: true,
          },
          {
            path: '/dashboard/monitor',
            name: 'monitor',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__Dashboard__models__activities.js' */ '/Users/mac/Desktop/WebUI/briup/day05/ej/src/pages/Dashboard/models/activities.js').then(
                      m => {
                        return { namespace: 'activities', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Dashboard__models__chart.js' */ '/Users/mac/Desktop/WebUI/briup/day05/ej/src/pages/Dashboard/models/chart.js').then(
                      m => {
                        return { namespace: 'chart', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Dashboard__models__monitor.js' */ '/Users/mac/Desktop/WebUI/briup/day05/ej/src/pages/Dashboard/models/monitor.js').then(
                      m => {
                        return { namespace: 'monitor', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__Dashboard__Monitor" */ '../Dashboard/Monitor'),
                  LoadingComponent: require('/Users/mac/Desktop/WebUI/briup/day05/ej/src/components/PageLoading/index')
                    .default,
                })
              : require('../Dashboard/Monitor').default,
            exact: true,
          },
          {
            path: '/dashboard/workplace',
            name: 'workplace',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__Dashboard__models__activities.js' */ '/Users/mac/Desktop/WebUI/briup/day05/ej/src/pages/Dashboard/models/activities.js').then(
                      m => {
                        return { namespace: 'activities', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Dashboard__models__chart.js' */ '/Users/mac/Desktop/WebUI/briup/day05/ej/src/pages/Dashboard/models/chart.js').then(
                      m => {
                        return { namespace: 'chart', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Dashboard__models__monitor.js' */ '/Users/mac/Desktop/WebUI/briup/day05/ej/src/pages/Dashboard/models/monitor.js').then(
                      m => {
                        return { namespace: 'monitor', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__Dashboard__Workplace" */ '../Dashboard/Workplace'),
                  LoadingComponent: require('/Users/mac/Desktop/WebUI/briup/day05/ej/src/components/PageLoading/index')
                    .default,
                })
              : require('../Dashboard/Workplace').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/mac/Desktop/WebUI/briup/day05/ej/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        path: '/customer',
        icon: 'user',
        name: 'customer',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__Customer__Customer" */ '../Customer/Customer'),
              LoadingComponent: require('/Users/mac/Desktop/WebUI/briup/day05/ej/src/components/PageLoading/index')
                .default,
            })
          : require('../Customer/Customer').default,
        exact: true,
      },
      {
        path: '/customerDetails',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__Customer__CustomerDetails" */ '../Customer/CustomerDetails'),
              LoadingComponent: require('/Users/mac/Desktop/WebUI/briup/day05/ej/src/components/PageLoading/index')
                .default,
            })
          : require('../Customer/CustomerDetails').default,
        exact: true,
      },
      {
        path: '/category',
        icon: 'ordered-list',
        name: 'category',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__Category__Category" */ '../Category/Category'),
              LoadingComponent: require('/Users/mac/Desktop/WebUI/briup/day05/ej/src/components/PageLoading/index')
                .default,
            })
          : require('../Category/Category').default,
        exact: true,
      },
      {
        path: '/product',
        icon: 'shopping',
        name: 'product',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__Product__Product" */ '../Product/Product'),
              LoadingComponent: require('/Users/mac/Desktop/WebUI/briup/day05/ej/src/components/PageLoading/index')
                .default,
            })
          : require('../Product/Product').default,
        exact: true,
      },
      {
        path: '/order',
        icon: 'snippets',
        name: 'order',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__Order__Order" */ '../Order/Order'),
              LoadingComponent: require('/Users/mac/Desktop/WebUI/briup/day05/ej/src/components/PageLoading/index')
                .default,
            })
          : require('../Order/Order').default,
        exact: true,
      },
      {
        path: '/comment',
        icon: 'smile',
        name: 'comment',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__Comment__Comment" */ '../Comment/Comment'),
              LoadingComponent: require('/Users/mac/Desktop/WebUI/briup/day05/ej/src/components/PageLoading/index')
                .default,
            })
          : require('../Comment/Comment').default,
        exact: true,
      },
      {
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__404" */ '../404'),
              LoadingComponent: require('/Users/mac/Desktop/WebUI/briup/day05/ej/src/components/PageLoading/index')
                .default,
            })
          : require('../404').default,
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('/Users/mac/Desktop/WebUI/briup/day05/ej/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    component: () =>
      React.createElement(
        require('/Users/mac/Desktop/WebUI/briup/day05/ej/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: true },
      ),
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen = () => {};

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    routeChangeHandler(history.location);
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return (
      <RendererWrapper0>
        <Router history={history}>{renderRoutes(routes, props)}</Router>
      </RendererWrapper0>
    );
  }
}
