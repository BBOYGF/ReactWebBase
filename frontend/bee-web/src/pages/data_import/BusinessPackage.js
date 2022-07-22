import React, {Fragment} from "react";
import {Button, Layout} from 'element-react'
import {Link, useParams} from "react-router-dom";

function BusinessPackage() {
    let params = useParams()


    return (
        <Fragment>
            <Layout.Row>
                <Button plain={true} style={{borderStyle: "unset", background: "unset"}}> <i
                    className="fas fa-backward"/> <Link to="/dataImport">返回</Link></Button>
            </Layout.Row>
            <Layout.Row>
                <div>id:{params.id}</div>
            </Layout.Row>
        </Fragment>
    );
}

export default BusinessPackage;