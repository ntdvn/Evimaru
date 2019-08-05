import React, { Component } from "react";
import { JSONisEmpty, compareObject } from "../services/multifunctional";

class MyDefaultStyleTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            orderBy: "",
            sortOrder: true,
        }
    }

    onItemClick = (position) => {
        this.props.clickItem(position);
    }

    handlerSort = field => {
        const { orderBy, sortOrder } = this.state;
        if(field === orderBy){
            if(sortOrder==true){
                this.props.data.rows.sort((a, b) => {
                    return (a[field] > b[field]) ? 1 : ((b[field] > a[field]) ? -1 : 0)
                })
                this.setState({sortOrder: false}, () => {

                })

            } else {
                this.props.data.rows.sort((a, b) => {
                    return (a[field] > b[field]) ? -1 : ((b[field] > a[field]) ? 1 : 0)
                })
                this.setState({sortOrder: true}, () => {

                })
            }
        } else {
            this.setState({orderBy: field, sortOrder: false}, () => {
                this.props.data.rows.sort((a, b) => {
                    return (a[field] > b[field]) ? 1 : ((b[field] > a[field]) ? -1 : 0)
                })
            })
        }
    }

    render(){
        const { data } = this.props;
        const { orderBy, sortOrder } = this.state;
        var tableHeaders, tableRows;
        if(!JSONisEmpty(data)){
            data.rows.sort((a, b) => {
                return (a[orderBy] > b[orderBy]) ? 1 : ((b[orderBy] > a[orderBy]) ? -1 : 0)
            })

            tableHeaders = data.columns.map((col, i, array) => {
                // console.log(col);
                const style = {width: col.width};
                var headerItemClass = "table-header-items";
                if(i==0){
                    headerItemClass+= " "+ "table-header-items-first";
                }
                else if (i==array.length-1){
                    headerItemClass+= " "+ "table-header-items-last";
                } else {
                    headerItemClass+= " "+ "table-header-items-between";
                }
                return (
                    <div key={i} className={headerItemClass} style={style} onClick={this.handlerSort.bind(this, col.field )}>{col.name}</div>
                )
            })


            tableRows = data.rows.map((row, rowIndex, rowArray) => {
                // var rowOddStyle, rowEvenStyle;
                // rowOddStyle = "table-row-odd-style";
                // rowOddStyle = "table-row-odd-style";
                var rowColStyle, rowColBetweenStyle, rowColLastStyle,
                    rowFirstColFirstStyle, rowFirstColBetweenStyle, rowFirstColLastStyle,
                    rowLastColFirstStyle, rowLastColBetweenStyle, rowLastColLastStyle,
                    rowBetweenColFirstStyle, rowBetweenColBetweenStyle, rowBetweenColLastStyle,

                    rowFirstColFirstStyle = "table-row-first-col-first";
                    rowFirstColBetweenStyle = "table-row-first-col-between";
                    rowFirstColLastStyle = "table-row-first-col-last";

                    rowLastColFirstStyle = "table-row-last-col-first";
                    rowLastColBetweenStyle = "table-row-last-col-between";
                    rowLastColLastStyle = "table-row-last-col-last";

                    rowBetweenColFirstStyle = "table-row-between-col-first";
                    rowBetweenColBetweenStyle = "table-row-between-col-between";
                    rowBetweenColLastStyle = "table-row-between-col-last";

                if(rowIndex == 0){
                    rowColStyle = rowFirstColFirstStyle;
                    rowColBetweenStyle = rowFirstColBetweenStyle;
                    rowColLastStyle = rowFirstColLastStyle;
                }
                else if(rowIndex == rowArray.length-1){
                    rowColStyle = rowLastColFirstStyle;
                    rowColBetweenStyle = rowLastColBetweenStyle;
                    rowColLastStyle = rowLastColLastStyle;
                } else {
                    rowColStyle = rowBetweenColFirstStyle;
                    rowColBetweenStyle = rowBetweenColBetweenStyle;
                    rowColLastStyle = rowBetweenColLastStyle;
                }


                var rowDivs = data.columns.map((col, colIndex, colArray) => {
                    const style = { width: col.width };
                    var headerItemClass = "table-row table-row-items";
                    if(colIndex==0){
                        headerItemClass+= " "+ rowColStyle;
                    }
                    else if (colIndex==colArray.length-1){
                        headerItemClass+= " "+ rowColBetweenStyle;
                    } else {
                        headerItemClass+= " "+ rowColLastStyle;
                    }
                    let value;
                    if(col.field=="STT") value=rowIndex+1;
                    else value = row[col.field];
                    return (
                        <div key={colIndex} className={headerItemClass} style={style}>
                            <div>{value}</div>
                        </div>
                    )
                })

                return (
                    <div
                        key={rowIndex}
                        className="table-row-wrapper"
                        onClick={this.onItemClick.bind(this, rowIndex)}
                    >
                        {rowDivs}
                    </div>
                )

            })
        }

        return(
            <div>
                <div className="table-header-wrapper">
                    {tableHeaders}

                </div>
                {tableRows}


            </div>
        )
    }
}
export default MyDefaultStyleTable;
