import React, { Component } from 'react';
import FA from 'react-fontawesome';

import BTBTable from 'blacktbox-table';
import BTBList from 'blacktbox-list';

import ALayout from 'components/articleLayout.js';

const mainTitle = (<span>Blacktbox-table <a target='_blank' className='linkBtn' href='https://github.com/BlackToolBoxLaboratory/blacktbox-table'><FA name='github' fixedWidth/></a></span>);
const mainDescriptionStr = `Table-maker tool.`;

const installationTitle = `INSTALLATION`;
const installationContent = (<span>Using with <a target='_blank' href='https://www.npmjs.com'>{`NPM`}<FA name='external-link' fixedWidth/></a>.</span>);

const usingTitle = `USING`;
const usingContent = (<span>Notice: DOM properties are still work with <a target='_blank' href='https://reactjs.org/docs/dom-elements.html'>{`ReactJS`}<FA name='external-link' fixedWidth/></a>.</span>);

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
const USING_PRE = 
`<BTBTable 
  tableHeadArr: [],
  tableBobyArr: [],
  modeObj: {
    mode: 'list'
  },
  styleObj: {},
  inputRefFn: ()=>{}
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
  {name: 'tableHeadArr',        type: 'Array',          default: '[]',      notice: (<pre className='content-pre'>{TABLEHEADARR_PRE}</pre>)},
  {name: '- name',              type: 'String or Node', default: '\'\'',    notice: 'String or Node to show table head name.'},
  {name: '- index',             type: 'String',         default: '\'\'',    notice: 'index of tableBobyArr.index.'},
//   {name: '- sortType',          type: 'String',         default: '\'\'',    notice: '[Unsupported Yet] index\'s sort type. {value: custom, string, number, ip, mac}'},
//   {name: '- sortFn',            type: 'Function',       default: '()=>{}',  notice: '[Unsupported Yet] define sort function while sortType is custom.'},
//   {name: '- defaultSortStatus', type: 'String',         default: '\'\'',    notice: '[Unsupported Yet] String to index tableBobyArr[\'index\'].'},
  {name: 'tableBobyArr',        type: 'Array',          default: '[]',      notice: (<pre className='content-pre'>{TABLEBODYARR_PRE}</pre>)},
  {name: 'modeObj',             type: 'Object',         default: '{}',      notice: ''},
  {name: '- mode',              type: 'String',         default: 'list',    notice: 'mode of table. {value: info, list}'},
//   {name: '- listFeatureSearch', type: 'Object',         default: '{}',      notice: '[Unsupported Yet] Table in list mode can show result with search\'s parameters'},
//   {name: '- - keyword',         type: 'String',         default: '\'\'',    notice: '[Unsupported Yet] Keyword to search data. Keyword with space can do multiple conditions search.'},
//   {name: '- - matchAll',        type: 'Boolean',        default: 'false',   notice: '[Unsupported Yet] MatchAll to search data matched with all conditions.'},
//   {name: '- listFeatureSort',   type: 'Object',         default: '{}',      notice: '[Unsupported Yet] Table in list mode can show result with sort\'s parameters.'},
//   {name: '- - enable',          type: 'Boolean',        default: 'false',   notice: '[Unsupported Yet] Enable sort feature for table in list mode.'},
//   {name: '- - defaultSortHead', type: 'String',         default: '\'\'',    notice: '[Unsupported Yet] Default active head to sort table.'},
//   {name: '- listFeaturePage',   type: 'Object',         default: '{}',      notice: '[Unsupported Yet] Table in list mode can show result with page\'s parameters.'},
//   {name: '- - perPage',         type: 'Number',         default: '0',       notice: '[Unsupported Yet] Show how many data by per-group.'},
//   {name: '- - page',            type: 'Number',         default: '0',       notice: '[Unsupported Yet] Index page of table to show'},
  {name: 'styleObj',            type: 'Object',         default:  '{}',     notice: (<pre className='content-pre'>{STYLEOBJ_PRE}</pre>)},
  {name: 'inputRefFn',          type: 'Function',       default:  '()=>{}', notice: 'To catch ref with (ref)=>{variable = ref}.'}
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
                'name': '<tr> .tbody-tr',
                'children': [
                  {
                    'name': '<th> .tr-th (.th-{th.index})'
                  },
                  {
                    'name': '<td> .tr-td (.td-{th.index})'
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
                    'name': '<th> .tr-th (.th-{th.index})'
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
                    'name': '<td> .tr-td (.td-{th.index})'
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

class Basic extends Component {
  render () {
    let content = [];
    content.push(
      <div className='wrapper wrapper-basic'>
        <ALayout.MainTitle>{mainTitle}</ALayout.MainTitle>
        <ALayout.MainDescription>{mainDescriptionStr}</ALayout.MainDescription>
        <ALayout.Section>
          <ALayout.SectionTitle>{installationTitle}</ALayout.SectionTitle>
          <ALayout.Content>{installationContent}</ALayout.Content>
          <ALayout.Pre>{INSTALLATION_PRE}</ALayout.Pre>
        </ALayout.Section>
        <ALayout.Section>
          <ALayout.SectionTitle>{usingTitle}</ALayout.SectionTitle>
          <ALayout.Pre>{USING_PRE}</ALayout.Pre>
          <BTBTable
            tableHeadArr={PARAM_HEAD}
            tableBobyArr={PARAM_BODY}
            modeObj={PARAM_MODE}
            className='content-paramlist'
          />
          <ALayout.Content>{usingContent}</ALayout.Content>
        </ALayout.Section>
        <ALayout.Section>
          <ALayout.SectionTitle>{nodeTreeTitle}</ALayout.SectionTitle>
          <ALayout.Content>{nodeTreeContent}</ALayout.Content>
          <ALayout.Content>
            <ALayout.SectionSubtitle>{nodeTreeInfoTitle}</ALayout.SectionSubtitle>
            <BTBList 
              className='content-nodetree'
              listArr={NODE_TREE_INFO}
            />
          </ALayout.Content>
          <ALayout.Content>
            <ALayout.SectionSubtitle>{nodeTreeListTitle}</ALayout.SectionSubtitle>
            <BTBList 
              className='content-nodetree'
              listArr={NODE_TREE_LIST}
            />
            <ALayout.Content>{nodeTreeNotice}</ALayout.Content>
          </ALayout.Content>
        </ALayout.Section>
      </div>
    );
    return content;
  };
};

export default Basic;
