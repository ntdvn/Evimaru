import React from "react";
import { MDBDataTable } from "mdbreact";
import { tableCoSoVatChat } from "../services/table";

const CoSoVatChat = props => {
    const { coSoDaoTao } = props;
    if(coSoDaoTao){
        // console.log(coSoDaoTao);
        var table;
        if(coSoDaoTao.coSoVatChat != null){
            // console.log(coSoDaoTao.coSoVatChat);
            const data = tableCoSoVatChat(coSoDaoTao.coSoVatChat);
            table = <div className="mt-3 text-wrap">
                <MDBDataTable
                    reponsive="true"
                    fixed
                    striped
                    bordered
                    hover
                    data={data}
                />
            </div>
        }
    }
    return (
        <div className="my-2 p-0">
            { table }
        </div>
    )
}

export default CoSoVatChat;
