import CloseIcon from '@mui/icons-material/Close';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Col, Row} from "react-bootstrap";
import {useEffect} from "react";
import EditSubCategoryForm from "@/components/UI/Category/EditSubCategoryForm";
import Chip from '@mui/material/Chip';



function SubCateDetailForm({data, close}) {
    const handleClose = () => {
        close();
    }
    let {category, subCate, index} = data;
    return (
        <Card style={{width:'550px'}}>
            <Card.Header >
                <Row>
                    <Col style={{marginTop:'7px'}} sm={1}>
                        <CloseIcon onClick={handleClose}/>
                    </Col>
                    <Col style={{marginTop:'7px'}}>
                        <h5> Category details</h5>
                    </Col>
                    <Col sm={2}>
                        <EditSubCategoryForm category={category} subCate={subCate} index={index}/>
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body>
                <Row>
                    <Col sm={2}>
                        <img style={{width:'60px'}} src="https://static.moneylover.me/img/icon/ic_category_foodndrink.png" alt=""/>
                    </Col>
                    <Col>
                        <Card.Title><h4>{subCate.name}</h4></Card.Title>
                        <Card.Text>
                            <Chip label={category.transType.name} color={category.transType.name==='Expense' ? 'error' : 'success'} variant="contained" />
                            </Card.Text>
                    </Col>
                </Row>

            </Card.Body>

        </Card>
    );
}

export default SubCateDetailForm;