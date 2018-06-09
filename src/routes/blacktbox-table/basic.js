import React, { Component } from 'react';
import FA from 'react-fontawesome';

import BTBTable from 'blacktbox-table';
import BTBList from 'blacktbox-list';

import AL from 'components/articleLayout.js';

const mainTitle = (<span>{`Blacktbox-table `}<a target='_blank' className='linkBtn' href='https://github.com/BlackToolBoxLaboratory/blacktbox-table'><FA name='github' fixedWidth/></a></span>);
const mainDescriptionStr = `Table-maker tool.`;

const installationTitle = `INSTALLATION`;
const installationContent = (<span>{`Using with`} <a target='_blank' href='https://www.npmjs.com'>{`NPM`}<FA name='external-link' fixedWidth/></a>{`.`}</span>);

const renderTitle = `RENDER`;
const renderContent = (<span>{`Notice: DOM properties are still work with `}<a target='_blank' href='https://reactjs.org/docs/dom-elements.html'>{`ReactJS`}<FA name='external-link' fixedWidth/></a>{`.`}</span>);

const nodeTreeTitle = `NODE TREE`;
const nodeTreeContent = `Here showing the node structure. Each node with className is for convenience to style. You have two way to use it. The first way is used with css selector, and the other way is used component's input: styleObj. But for blacktbox-table, we have two structure for two mode used.`;
const nodeTreeInfoTitle = `Mode Info:`;
const nodeTreeListTitle = `Mode List:`;
const nodeTreeNotice = `Notice: The th.index come from tableHeadArr.`;

const INSTALLATION_PRE = 
`$ npm install --save blacktbox-table

// using ES6 modules
import BTBTable from 'blacktbox-table';

// using CommonJS modules
var BTBTable = require('blacktbox-table');`;
const RENDER_PRE = 
`<BTBTable 
  tableHeadArr = []
  tableBobyArr = []
  modeObj: {
    mode: 'list'
  }
  styleObj: {}
  refFn: {()=>{}}
/>`;
// const TABLEHEADARR_PRE = 
// `tableHeadArr = [{
//   name: '',
//   index: '',
//   sortType: 'string',
//   sortFn: ()=>{},
//   defaultSortStatus: 'ascending'
// }, ...]`;
const TABLEHEADARR_PRE = 
`tableHeadArr = [{
  name: '',
  index: ''
}, ...]`;
const TABLEBODYARR_PRE = 
`tableBobyArr = [
  {tableHeadArr.index}: ''
  , ...
]`;
const STYLEOBJ_PRE = 
`styleObj = {
  'Node's className': {CSS Object}
  , ...
}`;
const PARAM_HEAD = new Array(
  {name: 'Property Name', index: 'name'},
  {name: 'Type',          index: 'type'},
  {name: 'Default',       index: 'default'},
  {name: 'Notice',        index: 'notice'}
);
const PARAM_BODY = new Array(
  {name: 'tableHeadArr',        type: 'Array',          default: '[]',          notice: (<pre className='content-pre'>{TABLEHEADARR_PRE}</pre>)},
  {name: '- name',              type: 'String or Node', default: '\'\', ()',    notice: `String or Node to show table head name.`},
  {name: '- index',             type: 'String',         default: '\'\'',        notice: `index of tableBobyArr.index.`},
//   {name: '- sortType',          type: 'String',         default: '\'\'',    notice: `[Unsupported Yet] index\'s sort type. {value: custom, string, number, ip, mac}`},
//   {name: '- sortFn',            type: 'Function',       default: '()=>{}',  notice: `[Unsupported Yet] define sort function while sortType is custom.`},
//   {name: '- defaultSortStatus', type: 'String',         default: '\'\'',    notice: `[Unsupported Yet] String to index tableBobyArr['index'].`},
  {name: 'tableBobyArr',        type: 'Array',          default: '[]',          notice: (<pre className='content-pre'>{TABLEBODYARR_PRE}</pre>)},
  {name: 'modeObj',             type: 'Object',         default: '{}',          notice: ``},
  {name: '- mode',              type: 'String',         default: 'list',        notice: `mode of table. {value: info, list}`},
//   {name: '- listFeatureSearch', type: 'Object',         default: '{}',      notice: `[Unsupported Yet] Table in list mode can show result with search's parameters`},
//   {name: '- - keyword',         type: 'String',         default: '\'\'',    notice: `[Unsupported Yet] Keyword to search data. Keyword with space can do multiple conditions search.`},
//   {name: '- - matchAll',        type: 'Boolean',        default: 'false',   notice: `[Unsupported Yet] MatchAll to search data matched with all conditions.`},
//   {name: '- listFeatureSort',   type: 'Object',         default: '{}',      notice: `[Unsupported Yet] Table in list mode can show result with sort's parameters.`},
//   {name: '- - enable',          type: 'Boolean',        default: 'false',   notice: `[Unsupported Yet] Enable sort feature for table in list mode.`},
//   {name: '- - defaultSortHead', type: 'String',         default: '\'\'',    notice: `[Unsupported Yet] Default active head to sort table.`},
//   {name: '- listFeaturePage',   type: 'Object',         default: '{}',      notice: `[Unsupported Yet] Table in list mode can show result with page's parameters.`},
//   {name: '- - perPage',         type: 'Number',         default: '0',       notice: `[Unsupported Yet] Show how many data by per-group.`},
//   {name: '- - page',            type: 'Number',         default: '0',       notice: `[Unsupported Yet] Index page of table to show`},
  {name: 'styleObj',            type: 'Object',         default:  '{}',         notice: (<pre className='content-pre'>{STYLEOBJ_PRE}</pre>)},
  {name: 'refFn',               type: 'Function',       default:  '(ref)=>{}',  notice: `To catch ref with (ref)=>{variable = ref}. (Only for stateful function)`}
);

const NODE_TREE_INFO = new Array(
  {
    'name': '<div> .btb-table',
    'children':[
      {
        'name': '<table> .table-info',
        'children': [
          {
            'name': '<tbody> .info-tbody',
            'children': [
              {
                'name': '<tr> .tbody-tr (.tr-{header.index})',
                'children': [
                  {
                    'name': '<th> .tr-th (.th-{header.index})'
                  },
                  {
                    'name': '<td> .tr-td (.td-{header.index})'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
);
const NODE_TREE_LIST = new Array(
  {
    'name': '<div> .btb-table',
    'children':[
      {
        'name': '<table> .table-info',
        'children': [
          {
            'name': '<thead> .info-thead',
            'children': [
              {
                'name': '<tr> .thead-tr',
                'children': [
                  {
                    'name': '<th> .tr-th (.th-{header.index})'
                  }
                ]
              }
            ]
          },
          {
            'name': '<tbody> .info-tbody',
            'children': [
              {
                'name': '<tr> .tbody-tr',
                'children': [
                  {
                    'name': '<td> .tr-td (.td-{header.index})'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
);
const PARAM_MODE = {
  mode: 'list'
};

const Basic = (props) => {
  let content = [];
  content.push(
    <div className='wrapper wrapper-basic'>
      <AL.MainTitle>{mainTitle}</AL.MainTitle>
      <AL.MainDescription>{mainDescriptionStr}</AL.MainDescription>
      <AL.Section>
        <AL.SectionTitle>{installationTitle}</AL.SectionTitle>
        <AL.Content>{installationContent}</AL.Content>
        <AL.Pre>{INSTALLATION_PRE}</AL.Pre>
      </AL.Section>
      <AL.Section>
        <AL.SectionTitle>{renderTitle}</AL.SectionTitle>
        <AL.Pre>{RENDER_PRE}</AL.Pre>
        <BTBTable
          tableHeadArr={PARAM_HEAD}
          tableBobyArr={PARAM_BODY}
          modeObj={PARAM_MODE}
          className='content-paramlist'
        />
        <AL.Content>{renderContent}</AL.Content>
      </AL.Section>
      <AL.Section>
        <AL.SectionTitle>{nodeTreeTitle}</AL.SectionTitle>
        <AL.Content>{nodeTreeContent}</AL.Content>
        <AL.Content>
          <AL.SectionSubtitle>{nodeTreeInfoTitle}</AL.SectionSubtitle>
          <BTBList 
            className='content-nodetree'
            listArr={NODE_TREE_INFO}
          />
        </AL.Content>
        <AL.Content>
          <AL.SectionSubtitle>{nodeTreeListTitle}</AL.SectionSubtitle>
          <BTBList 
            className='content-nodetree'
            listArr={NODE_TREE_LIST}
          />
          <AL.Content>{nodeTreeNotice}</AL.Content>
        </AL.Content>
      </AL.Section>
    </div>
  );
  return content;
};

export default Basic;
