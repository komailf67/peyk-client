/* eslint-disable import/no-mutable-exports */
import { createBrowserHistory } from 'history';
import { StaticRouter } from 'react-router';

let history = null;

if (typeof window !== 'undefined') {
  console.log('ppppppppppppppppppppppppp 1');
  history = createBrowserHistory();
} else {
  history = (url) => {
    console.log('ppppppppppppppppppppppppp 2');
    const staticRouter = new StaticRouter();
    staticRouter.props = { location: url, context: {}, basename: '' };
    const {
      props: { history: staticHistory },
    } = staticRouter.render();
    return staticHistory;
  };
}

export default history;

// import createHistory from 'history/createBrowserHistory';
// const history = createHistory();
// export default history;
