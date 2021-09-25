import { QueryRunner } from 'typeorm';
import { uuid } from 'uuidv4';

export class CarsSeed1632515987334 {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('cars')
      .values([
        {
          id: uuid(),
          placa: 'HAB3710',
          chassi: '9B97X3E9P8XC9I3CW',
          renavam: '62290784522',
          modelo: 'MARRU',
          marca: 'Agrale',
          ano: '2008',
        },
        {
          id: uuid(),
          placa: 'HJT8216',
          chassi: '9B9G02KNH063N6P2C',
          renavam: '50990832879',
          modelo: 'X5 Sport 4.4 4x4 V8 32V',
          marca: 'BMW',
          ano: '2001',
        },
        {
          id: uuid(),
          placa: 'HDH0427',
          chassi: '9B9V3ZDVVHRWAOKST',
          renavam: '74558729081',
          modelo: '2500 LARAMIE SLT TROPIV. 6.7 4x4 Diesel',
          marca: 'RAM',
          ano: '2012',
        },
        {
          id: uuid(),
          placa: 'GWT4002',
          chassi: '9B9BXQUNCG2OAY0HG',
          renavam: '47320331756',
          modelo: 'Hi-Topic STD Diesel',
          marca: 'Asia Motors',
          ano: '1993',
        },
        {
          id: uuid(),
          placa: 'HKZ8432',
          chassi: '9B9X8M5RBZ2KR5LCX',
          renavam: '74409462237',
          modelo: 'B-2500 Pick-Up 4x4 2.5 Diesel',
          marca: 'Mazda',
          ano: '1998',
        },
        {
          id: uuid(),
          placa: 'GLV7125',
          chassi: '9B98CDTD6QJTJOQE4',
          renavam: '31271124180',
          modelo: 'E-430 Avantgarde',
          marca: 'Mercedes-Benz',
          ano: '1997',
        },
        {
          id: uuid(),
          placa: 'GRW3207',
          chassi: '9B9S854MA2GDPU64K',
          renavam: '67253888000',
          modelo: 'F458 Speciale F1 4.5 V8',
          marca: 'Ferrari',
          ano: '2013',
        },
        {
          id: uuid(),
          placa: 'GWI1780',
          chassi: '9B9UO3SYR1MEZIZFT',
          renavam: '97490425456',
          modelo: 'Buggy IV e V',
          marca: 'Bugre',
          ano: '1985',
        },
        {
          id: uuid(),
          placa: 'HHF6797',
          chassi: '9B96AVIIYP2443SBV',
          renavam: '54574848508',
          modelo: 'Trans-AM 5.7 V8',
          marca: 'Pontiac',
          ano: '1991',
        },
        {
          id: uuid(),
          placa: 'HJN7543',
          chassi: '9B9ZTNVRIHGC8Z01X',
          renavam: '71223304602',
          modelo: 'RF Esport T-4 4x4 2.0 Cap. Lona',
          marca: 'Troller',
          ano: '1998',
        },
        {
          id: uuid(),
          placa: 'HMY5382',
          chassi: '9B9AKPBKM2THA4TK5',
          renavam: '22063192757',
          modelo: 'Quattroporte GTS 3.8 V8 32V 530cv',
          marca: 'Maserati',
          ano: '2014',
        },
        {
          id: uuid(),
          placa: 'HDR0294',
          chassi: '9B9MIVOOT98CV8ZNO',
          renavam: '00690780710',
          modelo: 'Family 1.0 8V 53cv (Perua)',
          marca: 'CHANA',
          ano: '2005',
        },
        {
          id: uuid(),
          placa: 'GVV7682',
          chassi: '9B9GW4TOIZUOM2PJE',
          renavam: '46911381366',
          modelo: 'L200 OUTDOOR GLS 2.5 4X4 CD TDI Diesel',
          marca: 'Mitsubishi',
          ano: '2007',
        },
        {
          id: uuid(),
          placa: 'GYR7404',
          chassi: '9B9NQLGDE22R9L7G9',
          renavam: '94032486756',
          modelo: 'Charade Sedan 1.3i 16V',
          marca: 'Daihatsu',
          ano: '1994',
        },
        {
          id: uuid(),
          placa: 'GTE7003',
          chassi: '9B955E1LVDSJF6JOK',
          renavam: '64135211294',
          modelo: 'Buggy 2000W 1.8 8V/ 1.8 8V Flex',
          marca: 'Fyber',
          ano: '2004',
        },
      ])
      .execute();
  }
}
