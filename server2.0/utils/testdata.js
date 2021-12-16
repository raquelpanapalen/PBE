const users = [
    { userid: '8AACFA3F', username: 'Llavero Azul' },
    { userid: 'B900B5B2', username: 'Tarjeta blanca' },
    { userid: '0474893A616081', username: 'Etiqueta NFC 1' },
    { userid: '04C4893A616080', username: 'Etiqueta NFC 2' },
    { userid: 'Joel', username: 'nicogatogordo' , password: 'nicogatogordo2'}
]

const marks = [
    { userid: '8AACFA3F', mark: 9, name: 'Control parcial', subject: 'DSBM' },
    { userid: '8AACFA3F', mark: 4, name: 'Examen final', subject: 'PSVAC' },
    { userid: '8AACFA3F', mark: 5.5, name: 'Entregable 2', subject: 'PBE' },
    { userid: '8AACFA3F', mark: 6.8, name: 'Pràctica 3', subject: 'RP' },
    { userid: '8AACFA3F', mark: 7.3, name: 'Control 1', subject: 'RP' },
    { userid: 'B900B5B2', mark: 7.1, name: 'Control parcial', subject: 'ONELE' },
    { userid: 'B900B5B2', mark: 7.9, name: 'Examen final', subject: 'ICOM' },
    { userid: 'B900B5B2', mark: 6.5, name: 'Entregable 2', subject: 'DGD' },
    { userid: 'B900B5B2', mark: 5.8, name: 'Pràctica 3', subject: 'AST' },
    { userid: 'B900B5B2', mark: 8.5, name: 'Estudi previ 4', subject: 'IPAV' },
    { userid: 'B900B5B2', mark: 5.8, name: 'Pràctica 4', subject: 'AST' },
    { userid: '0474893A616081', mark: 9.5, name: 'Estudi previ 1', subject: 'CSL' },
    { userid: '0474893A616081', mark: 8.8, name: 'Pràctica 5', subject: 'AST' },
    { userid: '04C4893A616080', mark: 3.9, name: 'Examen laboratori', subject: 'POO' },
    { userid: '04C4893A616080', mark: 4.5, name: 'Examen parcial 2', subject: 'IXT' },
    { userid: '04C4893A616080', mark: 5.2, name: 'Pràctica 1', subject: 'IPAV' },
    { userid: '04C4893A616080', mark: 7.5, name: 'Estudi previ 5', subject: 'FISE' },
    { userid: '04C4893A616080', mark: 5.3, name: 'Examen final', subject: 'CAVEC' }
]

const tasks = [
    { userid: '8AACFA3F', date: new Date("2021-10-02"), name: 'Control parcial', subject: 'PSVAC' },
    { userid: '8AACFA3F', date: new Date("2021-12-16"), name: 'Pràctica 3', subject: 'DSBM' },
    { userid: '8AACFA3F', date: new Date("2021-12-22"), name: 'CDR', subject: 'PBE' },
    { userid: '8AACFA3F', date: new Date("2021-12-06"), name: 'Pràctica 6', subject: 'RP' },
    { userid: 'B900B5B2', date: new Date("2021-12-13"), name: 'Control parcial', subject: 'POO' },
    { userid: 'B900B5B2', date: new Date("2021-12-15"), name: 'Control lab', subject: 'ICOM' },
    { userid: 'B900B5B2', date: new Date("2021-11-28"), name: 'Entregable 5', subject: 'DGD' },
    { userid: 'B900B5B2', date: new Date("2021-11-14"), name: 'Pràctica 7', subject: 'FISE' },
    { userid: 'B900B5B2', date: new Date("2021-11-18"), name: 'Entrega projecte', subject: 'ENTIC' },
    { userid: 'B900B5B2', date: new Date("2021-11-11"), name: 'Pràctica 7', subject: 'AST' },
    { userid: '0474893A616081', date: new Date("2021-12-22"), name: 'Pràctica 4', subject: 'CSL' },
    { userid: '0474893A616081', date: new Date("2021-12-22"), name: 'Control parcial', subject: 'IPAV' },
    { userid: '0474893A616081', date: new Date("2021-12-12"), name: 'Examen laboratori', subject: 'ONELE' },
    { userid: '0474893A616081', date: new Date("2021-12-11"), name: 'Entrega treball', subject: 'PBE' },
    { userid: '04C4893A616080', date: new Date("2021-12-04"), name: 'Pràctica 5', subject: 'ICOM' },
    { userid: '04C4893A616080', date: new Date("2021-11-29"), name: 'Control lab', subject: 'FISE' },
    { userid: '04C4893A616080', date: new Date("2021-11-15"), name: 'Control parcial', subject: 'MATEL' }
]

const timetables = [
    { userid: '8AACFA3F', day: 1, hour: "08:00", room: 'A4-101', subject: 'ICOM' },
    { userid: '8AACFA3F', day: 1, hour: "10:00", room: 'A4-101', subject: 'DSBM' },
    { userid: '8AACFA3F', day: 1, hour: "12:00", room: 'A4-101', subject: 'PBE' },
    { userid: '8AACFA3F', day: 2, hour: "08:00", room: 'D3-006', subject: 'RP' },
    { userid: '8AACFA3F', day: 2, hour: "10:00", room: 'A4-101', subject: 'PSVAC' },
    { userid: '8AACFA3F', day: 2, hour: "12:00", room: 'A4-101', subject: 'ICOM' },
    { userid: '8AACFA3F', day: 3, hour: "08:30", room: 'A4-101', subject: 'PBE' },
    { userid: '8AACFA3F', day: 3, hour: "10:30", room: 'D3-006', subject: 'RP' },
    { userid: '8AACFA3F', day: 3, hour: "16:00", room: 'A4-101', subject: 'PSVAC' },
    { userid: '8AACFA3F', day: 4, hour: "08:00", room: 'A4-101', subject: 'DSBM' },
    { userid: '8AACFA3F', day: 4, hour: "10:00", room: 'A4-101', subject: 'PBE' },
    { userid: '8AACFA3F', day: 4, hour: "12:00", room: 'D3-006', subject: 'RP' },
    { userid: '8AACFA3F', day: 5, hour: "11:00", room: 'A4-101', subject: 'ICOM' },
    { userid: '8AACFA3F', day: 5, hour: "13:00", room: 'A4-101', subject: 'DSBM' },
    { userid: 'B900B5B2', day: 1, hour: "08:00", room: 'A2-201', subject: 'POO' },
    { userid: 'B900B5B2', day: 1, hour: "10:00", room: 'A3-105', subject: 'ICOM' },
    { userid: 'B900B5B2', day: 2, hour: "12:00", room: 'A2-204', subject: 'DGD' },
    { userid: 'B900B5B2', day: 2, hour: "15:00", room: 'A3-103', subject: 'FISE' },
    { userid: 'B900B5B2', day: 2, hour: "17:00", room: 'C4S102', subject: 'ENTIC' },
    { userid: 'B900B5B2', day: 3, hour: "08:00", room: 'A3-105', subject: 'AST' },
    { userid: 'B900B5B2', day: 3, hour: "10:00", room: 'A2-201', subject: 'POO' },
    { userid: 'B900B5B2', day: 3, hour: "12:00", room: 'A3-105', subject: 'ICOM' },
    { userid: 'B900B5B2', day: 4, hour: "08:00", room: 'A2-204', subject: 'DGD' },
    { userid: 'B900B5B2', day: 4, hour: "11:00", room: 'A3-103', subject: 'FISE' },
    { userid: 'B900B5B2', day: 5, hour: "08:00", room: 'C4S102', subject: 'ENTIC' },
    { userid: 'B900B5B2', day: 5, hour: "10:00", room: 'A3-105', subject: 'AST' },
    { userid: 'B900B5B2', day: 5, hour: "12:00", room: 'A2-201', subject: 'POO' },
    { userid: '0474893A616081', day: 1, hour: "08:00", room: 'A2-204', subject: 'CSL' },
    { userid: '0474893A616081', day: 1, hour: "11:00", room: 'A4-101', subject: 'IPAV' },
    { userid: '0474893A616081', day: 1, hour: "12:00", room: 'D3-006', subject: 'ONELE' },
    { userid: '0474893A616081', day: 2, hour: "08:00", room: 'A4-101', subject: 'ENTIC' },
    { userid: '0474893A616081', day: 2, hour: "10:00", room: 'A2-204', subject: 'CSL' },
    { userid: '0474893A616081', day: 2, hour: "13:00", room: 'A4-101', subject: 'IPAV' },
    { userid: '0474893A616081', day: 3, hour: "15:00", room: 'D3-006', subject: 'ONELE' },
    { userid: '0474893A616081', day: 3, hour: "17:00", room: 'A4-101', subject: 'CSL' },
    { userid: '0474893A616081', day: 3, hour: "19:00", room: 'A2-204', subject: 'ENTIC' },
    { userid: '0474893A616081', day: 4, hour: "13:00", room: 'A4-101', subject: 'ENTIC' },
    { userid: '0474893A616081', day: 4, hour: "17:00", room: 'D3-006', subject: 'ONELE' },
    { userid: '0474893A616081', day: 5, hour: "12:00", room: 'A4-101', subject: 'IPAV' },
    { userid: '0474893A616081', day: 5, hour: "15:00", room: 'A2-204', subject: 'CSL' },
    { userid: '04C4893A616080', day: 1, hour: "08:00", room: 'A3-105', subject: 'ICOM' },
    { userid: '04C4893A616080', day: 1, hour: "10:00", room: 'C4S102', subject: 'AST' },
    { userid: '04C4893A616080', day: 1, hour: "12:00", room: 'A3-105', subject: 'MATEL' },
    { userid: '04C4893A616080', day: 2, hour: "10:00", room: 'A3-105', subject: 'ICOM' },
    { userid: '04C4893A616080', day: 2, hour: "13:00", room: 'C4S102', subject: 'FISE' },
    { userid: '04C4893A616080', day: 3, hour: "08:00", room: 'A3-105', subject: 'CAVEC' },
    { userid: '04C4893A616080', day: 3, hour: "10:00", room: 'A3-105', subject: 'AST' },
    { userid: '04C4893A616080', day: 3, hour: "12:00", room: 'C4S102', subject: 'FISE' },
    { userid: '04C4893A616080', day: 4, hour: "15:00", room: 'A3-105', subject: 'MATEL' },
    { userid: '04C4893A616080', day: 4, hour: "17:00", room: 'A3-105', subject: 'ICOM' },
    { userid: '04C4893A616080', day: 4, hour: "19:00", room: 'C4S102', subject: 'FISE' },
    { userid: '04C4893A616080', day: 5, hour: "08:00", room: 'A3-105', subject: 'MATEL' },
    { userid: '04C4893A616080', day: 5, hour: "11:00", room: 'A3-105', subject: 'CAVEC' }
]

module.exports = { users, marks, tasks, timetables }