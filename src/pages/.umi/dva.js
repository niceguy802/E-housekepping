import dva from 'dva';
import { Component } from 'react';
import createLoading from 'dva-loading';
import history from '@tmp/history';

let app = null;

export function _onCreate() {
  const plugins = require('umi/_runtimePlugin');
  const runtimeDva = plugins.mergeConfig('dva');
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    ...(window.g_useSSR ? { initialState: window.g_initialData } : {}),
  });
  
  app.use(createLoading());
  (runtimeDva.plugins || []).forEach(plugin => {
    app.use(plugin);
  });
  
  app.model({ namespace: 'address', ...(require('/Users/mac/Desktop/WebUI/briup/day05/ej/src/models/address.js').default) });
app.model({ namespace: 'category', ...(require('/Users/mac/Desktop/WebUI/briup/day05/ej/src/models/category.js').default) });
app.model({ namespace: 'comment', ...(require('/Users/mac/Desktop/WebUI/briup/day05/ej/src/models/comment.js').default) });
app.model({ namespace: 'customer', ...(require('/Users/mac/Desktop/WebUI/briup/day05/ej/src/models/customer.js').default) });
app.model({ namespace: 'global', ...(require('/Users/mac/Desktop/WebUI/briup/day05/ej/src/models/global.js').default) });
app.model({ namespace: 'list', ...(require('/Users/mac/Desktop/WebUI/briup/day05/ej/src/models/list.js').default) });
app.model({ namespace: 'login', ...(require('/Users/mac/Desktop/WebUI/briup/day05/ej/src/models/login.js').default) });
app.model({ namespace: 'menu', ...(require('/Users/mac/Desktop/WebUI/briup/day05/ej/src/models/menu.js').default) });
app.model({ namespace: 'order', ...(require('/Users/mac/Desktop/WebUI/briup/day05/ej/src/models/order.js').default) });
app.model({ namespace: 'product', ...(require('/Users/mac/Desktop/WebUI/briup/day05/ej/src/models/product.js').default) });
app.model({ namespace: 'project', ...(require('/Users/mac/Desktop/WebUI/briup/day05/ej/src/models/project.js').default) });
app.model({ namespace: 'setting', ...(require('/Users/mac/Desktop/WebUI/briup/day05/ej/src/models/setting.js').default) });
app.model({ namespace: 'test', ...(require('/Users/mac/Desktop/WebUI/briup/day05/ej/src/models/test.js').default) });
app.model({ namespace: 'user', ...(require('/Users/mac/Desktop/WebUI/briup/day05/ej/src/models/user.js').default) });
app.model({ namespace: 'waiter', ...(require('/Users/mac/Desktop/WebUI/briup/day05/ej/src/models/waiter.js').default) });
  return app;
}

export function getApp() {
  return app;
}

export class _DvaContainer extends Component {
  render() {
    const app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
