import React, { Component } from "react";
import { Document, Page } from 'react-pdf';

class NoiDungHoc extends Component {
    constructor(props){
        super(props);
        this.state = {
            numPages: null,
            pageNumber: 1,
        }
    }
    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    }
    render(){
        // <Document
        //     file="https://www.axmag.com/download/pdfurl-guide.pdf"
        //     onLoadSuccess={this.onDocumentLoadSuccess}
        // >
        //     <Page pageNumber={pageNumber} />
        // </Document>
        // <p>Page {pageNumber} of {numPages}</p>
        const { pageNumber, numPages } = this.state;
        // console.log("haha");
        return (
            <div>

                <iframe
                    style={{width: "100%", height: "600px"}}
                    src="https://drive.google.com/uc?export=view&id=188yQlVrthiX8CrK1V0O0Yv6l8wW463pe" title="title"
                >
                     Presss me: <a href="https://www.axmag.com/download/pdfurl-guide.pdf">Download PDF</a>
                </iframe>

            </div>
        )
    }
}

export default NoiDungHoc;
