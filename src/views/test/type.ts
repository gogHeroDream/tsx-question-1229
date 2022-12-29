


interface IopType {
    options: TableSpace.Ioptions
}

export interface IsearchType {
    platformNo: string,
    orderNo: string,
    startTime: string,
    endTime: string,
}
export interface Item {
    id: number
    platformNo: string
    deliverAddress: string,
    takeAddress: string,
    insuranceFlag: boolean,
    driverName: string
    driverMobile: string
    drivingTypeList: commonType.IeType[]
    approveStatus: string
    takeStatus: string
    bindStatus: string
    createTime: string
    rejectReason: string
}
export interface IreItem {
    id: number
    plateNumber: string
    loads: string
    plateColor: string
    vehicleCategory: string
    vehicleType: string
    roadTransCertiNumber: string
    name: string
    phone: string
}
export interface IformDr {
    driverName: string
    driverMobile: string
    quasiDrivingType: string
    approveStatus: string
    takeStatus: string
    bindStatus: number | string
}
export type TableDemoParams = {
    page: number
    pageSize: number
}

export interface Istate extends IopType {
    tableData: Item[]
}

export interface Ireceive extends IopType {
    receiveData: IreItem[]
}

export type TformDriver = {
    driverName: string
    driverMobile: string
    quasiDrivingType: number | string
    idCardNo: string
    idCardAddr: string
    idCardFrontImg: string
    idCardBackImg: string
    licenseMainImg: string
    licenseCopyImg: string
    transportCertificateImg: string
}
export type Treceive = {
    type: string
    content:string
}
