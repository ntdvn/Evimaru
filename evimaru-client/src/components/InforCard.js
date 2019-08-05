import React from "react";
import {Card, CardBody} from "mdbreact";
import DefaultProfileImg from "../images/user_unknow.png";

const InforCard = props => {
    // console.log(props);
    const { username, email, coQuanQuanLy, coSoDaoTao } = props;
    var roleFactory;
    if(coSoDaoTao!=null) roleFactory = <p>{coSoDaoTao.name}</p>;
    if(coQuanQuanLy!=null) roleFactory = <p>{coQuanQuanLy.name}</p>;
    return (
        <Card className="mb-3">
            <div className="border border-primary border-right-0
                    border-left-0 border-top-0 d-flex flex-column
                    justify-content-center align-items-center"
            >
                <img
                    src={DefaultProfileImg}
                    alt="IMG NOT FOUND"
                    className="img-thumbnail img-fluid rounded-circle mt-2"
                    style={{width: "150px"}}
                />
                <h5 className=" green-text
                        text-center py-4
                        "
                >
                    {username}
                </h5>

            </div>
            <CardBody>
                <div>
                    <p>{email}</p>
                    {roleFactory}
                </div>
            </CardBody>
        </Card>
    )
}
export default InforCard;
