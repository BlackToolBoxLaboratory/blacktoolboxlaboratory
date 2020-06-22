import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import classnames from 'classnames';
import { compose } from 'recompose';

import { lang } from '@src/plugins/btblab-prototype-languages.js';
import { langAction } from '@src/stores/langStore.js';

import Head from './Head.jsx';
import Foot from './Foot.jsx';
import Aside from './Aside.jsx';

import CONST from '@src/assets/definitions/const.js';

const enhance = compose(
  connect(
    (state) => {
      return {
        'languageSetting'  : state.language.languageSetting
      };
    }
  ),
  withRouter
);

const Layout = enhance((props) => {
  const env = {
    state_hiddenMenu : useMenuState((window.innerWidth < CONST.GRID_MD))
  };

  useEffect(() => {
    _initialLang();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [props.history.location.pathname]);

  const _initialLang = () => {
    if (!props.languageSetting.length)
    {
      const userLang = navigator.language || navigator.userLanguage; 
      const result = lang.menu().find((item) => {
        return userLang.search(new RegExp(item.index, 'i')) >= 0;
      });
      lang.set(result.index);
      props.dispatch(langAction.setLang(result.index));
    } else {
      lang.set(props.languageSetting);
    }
  };
  
  function _clickEntry () {
    if (window.innerWidth < CONST.GRID_MD) {
      env.state_hiddenMenu.onToggle(true);
    }
  }
  function _toggleMenu() {
    env.state_hiddenMenu.onToggle();
  }

  return (
    <div className="btb-layout">
      <Head className="layout_head" toggleMenu={_toggleMenu}/>
      <div className="layout_content">
        {props.children}
      </div>
      <Foot className="layout_foot"/>
      <Aside className={classnames('layout_aside', { 'aside-hidden' : env.state_hiddenMenu.value})} clickEntry={_clickEntry}/>
    </div>
  );
});

function useMenuState (defaultSate) {
  const [value, setState] = useState(defaultSate);
  return {
    value,
    onToggle : (bol) => {
      setState((typeof bol != 'undefined')? bol : !value);
    }
  };
}

export default Layout;