import { Component } from "react";
import { Card, CardBody, CardFooter, Col, DropdownItem, DropdownMenu, DropdownToggle, Pagination, PaginationItem, PaginationLink, Row, Table, UncontrolledDropdown } from "reactstrap";
import { formatBytes } from "../../../utils/utils";
import "./data-table.scss";
import classNames from "classnames";

export interface IDeviceInfo {
    "_id": number,
    "MAC": string,
    "version": string,
    "BAND": number,
    "CustID": string,
    "EARFCN": number,
    "IP": string,
    "IPv6": string,
    "createdAt": string,
    "updatedAt": string,
    "MODEL": string,
    "CNUM": string,
    "SYSUPTIME": number,
    "ULBW": number,
    "DLBW": number,
    "fwVersion": string,
    "online": boolean,
    "wan": string,
    "name": string,
    "rx_bytes": number,
    "tx_bytes": number,
    "RSSI": number,
    "RSRQ": number,
    "RSRP": number,
    "SINR": number,
}

interface IProps {
    columns: Array<{
        name: string,
        className?: string,
    }>,
    data: IDeviceInfo[],
    pageSizes: number[],
}

interface IState extends IProps {
    currentPage: number;
    itemsPerPage: number;
}

export class DataTable extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            data: props.data,
            pageSizes: props.pageSizes,
            currentPage: 1,
            itemsPerPage: props.pageSizes[0] || 10,
            columns: props.columns,
        }
    }

    private handleClick = (_: any, pageNum: number) => {
        this.setState({
            currentPage: pageNum,
        });
    }

    render() {
        const { data, columns, pageSizes, itemsPerPage, currentPage } = this.state;
        const totalDevicesCount = data.length;
        const onlineDevicesCount = data.filter((device) => device.online).length;
        const listSortedByUsage = data.slice().sort(
            (a, b) => (b.rx_bytes + b.tx_bytes) - (a.rx_bytes + a.tx_bytes)
        );
        const highestUsageDevice = listSortedByUsage[0];
        const lowestUsageDevice = listSortedByUsage[listSortedByUsage.length - 1];

        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

        const renderDevices = currentItems.map((device, index) => {
            return (
                <tr key={`row_${index}`} >
                    <td>{device.name}</td>
                    <td>{device.MODEL}</td>
                    <td>{device.IP}</td>
                    <td className="text-center">
                        <span className={classNames([{ "is-online": device.online }])} />
                    </td>
                    <td className="text-right">{formatBytes(device.rx_bytes)}</td>
                    <td className="text-right">{formatBytes(device.tx_bytes)}</td>
                </tr>
            )
        });

        const pageNumbers: number[] = [];
        for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
            pageNumbers.push(i);
        }
        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <PaginationItem active={currentPage === number} key={`page-${number}`}>
                    <PaginationLink href="#" onClick={(e) => this.handleClick(e, number)}>
                        {number}
                    </PaginationLink>
                </PaginationItem>
            )
        });

        return (
            <Col md="12">
                <Row>
                    <Col md="2">
                        <Card className="card-statistic">
                            <CardBody className="pl-4">
                                <div className="number-statistic">{totalDevicesCount}</div>
                                <div>Total devices</div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md="2">
                        <Card className="card-statistic">
                            <CardBody className="pl-4">
                                <div className="number-statistic">{onlineDevicesCount}</div>
                                <div>Online devices</div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md="4">
                        <Card className="card-statistic">
                            <CardBody className="pl-4">
                                <div className="number-statistic">
                                    {formatBytes(highestUsageDevice.rx_bytes + highestUsageDevice.tx_bytes)}
                                </div>
                                <div>Most usage by: <span className="text-light">{highestUsageDevice.name}</span></div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md="4">
                        <Card className="card-statistic">
                            <CardBody className="pl-4">
                                <div className="number-statistic">
                                    {formatBytes(lowestUsageDevice.rx_bytes + lowestUsageDevice.tx_bytes)}
                                </div>
                                <div>Least usage by: <span className="text-light">{lowestUsageDevice.name}</span></div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <h4 className="text-uppercase font-weight-bold text-light">
                    Device list
                </h4>
                <Card>
                    <CardBody>
                        <Table responsive striped={true} hover={true}>
                            <thead>
                                <tr>
                                    {
                                        columns.map((column) =>
                                            <th key={column.name} className={`text-primary ${column.className}`}>
                                                {column.name}
                                            </th>
                                        )
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {renderDevices}
                            </tbody>
                        </Table>
                    </CardBody>
                    <CardFooter className="d-flex justify-content-between">
                        <UncontrolledDropdown>
                            <DropdownToggle caret size="sm" data-toggle="dropdown">
                                {itemsPerPage}
                            </DropdownToggle>
                            <DropdownMenu>
                                {pageSizes.map((pageSize) =>
                                    <DropdownItem
                                        active={pageSize === itemsPerPage}
                                        onClick={() => this.setState({
                                            itemsPerPage: pageSize,
                                        })}
                                    >
                                        {pageSize}
                                    </DropdownItem>
                                )}
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <Pagination>
                            <PaginationItem disabled={currentPage === 1}>
                                <PaginationLink
                                    first
                                    href="#"
                                    onClick={(e) => this.handleClick(e, 1)}
                                />
                            </PaginationItem>
                            <PaginationItem disabled={currentPage === 1}>
                                <PaginationLink
                                    previous
                                    href="#"
                                    onClick={(e) => this.handleClick(e, currentPage - 1)}
                                />
                            </PaginationItem>
                            {renderPageNumbers}
                            <PaginationItem>
                                <PaginationLink
                                    last
                                    href="#"
                                    onClick={(e) => this.handleClick(e, pageNumbers.length)}
                                />
                            </PaginationItem>
                        </Pagination>
                    </CardFooter>
                </Card>
            </Col>
        )
    }
}