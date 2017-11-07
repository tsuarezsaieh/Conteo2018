'use strict';
import _ from 'underscore';
import 'whatwg-fetch';
//https://spreadsheets.google.com/feeds/list/1PNINE7vaBDlM7rlWpOdWJQ0OvBobg_4J0Y_AFIngEm8/oaqqg8y/public/values?alt=json
//https://spreadsheets.google.com/feeds/list/1PNINE7vaBDlM7rlWpOdWJQ0OvBobg_4J0Y_AFIngEm8/5/public/values?alt=json
const SERVER_URL = 'https://pacific-ridge-96612.herokuapp.com';
const SHEET_ID = '1aHiLHsH9i-ZNFNfogvoXinHnNTmCjCxAZcQsrbylCMk';
const WSHEET_ID = '5';
const SHEET_URL = `https://spreadsheets.google.com/feeds/list/${SHEET_ID}` +
                  `/${WSHEET_ID}/public/values?alt=json`;

const g = (obj, prop) => obj[`gsx$${prop}`].$t;

const getFullObject = (obj) => {
  let fullObj = {
    id: g(obj, 'id'),
    name: g(obj, 'name'),
    mg: g(obj, 'mg'),
    mgpc:	g(obj, 'mgpc'),
    decrecer: g(obj, 'decrecer'),
    decrecerpc: g(obj, 'decrecerpc'),
    nau: g(obj, 'nau'),
    naupc: g(obj, 'naupc'),
    ia: g(obj, 'ia'),
    iapc: g(obj, 'iapc'),
    sdd: g(obj, 'sdd'),
    sddpc: g(obj, 'sddpc'),
    b: g(obj, 'b'),
    bpc: g(obj, 'bpc'),
    n: g(obj, 'n'),
    npc: g(obj, 'npc'),
    votosve: g(obj, 'votosve'),
    votos: g(obj, 'votos'),
    escrutada: g(obj, 'escrutada') == 'TRUE',
    participacion: g(obj, 'participacion'),
  };

  return fullObj;
};

const converter = function (sheetObject) {
  let converted = {
    dia1: {
      lista: {
        mesa: {},
        terri: {},
        total: {},
      }, sup: {
        mesa: {},
        terri: {},
        total: {},
      },
    },
    dia2: {
      lista: {
        mesa: {},
        terri: {},
        total: {},
      }, sup: {
        mesa: {},
        terri: {},
        total: {},
      },
    },
    total: {
      lista: {
        mesa: {},
        terri: {},
        total: {},
      },
      sup: {
        mesa: {},
        terri: {},
        total: {},
      },
    },
    terris: {},
    totalct: {},
  };
  let lines =  sheetObject.feed.entry;

  lines.forEach((line) => {

    if (_.contains(['dia1', 'dia2', 'total'], g(line, 'tiempo'))) {
      if (_.contains(['total'], g(line, 'area'))) {
        converted
          [g(line, 'tiempo')]
          [g(line, 'tipo')]
          [g(line, 'area')] = getFullObject(line);
      } else {
        converted
          [g(line, 'tiempo')]
          [g(line, 'tipo')]
          [g(line, 'area')]
          [g(line, 'id')] = getFullObject(line);
      }
    } else if (_.contains(['terris'], g(line, 'tiempo'))) {
      if (!_.isArray(converted.terris[g(line, 'area')])) {
        converted.terris[g(line, 'area')] = [];
      }

      converted.terris[g(line, 'area')].push({
        mov: g(line, 'id'),
        movid: g(line, 'tipo'),
        nombre: g(line, 'name'),
        votos: g(line, 'mg'),
        pc: g(line, 'mgpc'),
        electo: g(line, 'decrecer') == 'TRUE',
      });
    } else if (_.contains(['totalct'], g(line, 'tiempo'))) {
      converted.totalct[g(line, 'tipo')] = g(line, 'area');
    }

  });

  return converted;
};

export function getData() {
  return fetch(SHEET_URL)
    .then((response) => response.json())
    .then((object) => {
      let convertPromise = new Promise(function (resolve, reject) {
        resolve(converter(object));
      });

      return convertPromise;
    });
}
export function getServerData() {
  return fetch(SERVER_URL)
    .then((response) => response.json());
}

export const defaultObject = {
  mg: 0,
  mgpc: 0,
  decrecer: 0,
  decrecerpc: 0,
  nau: 0,
  naupc: 0,
  ia: 0,
  iapc: 0,
  sdd: 0,
  sddpc: 0,
  b: 0,
  bpc: 0,
  n: 0,
  npc: 0,
  votosve: 0,
  votos: 0,
  escrutada: false,
  participacion: 0,
};
