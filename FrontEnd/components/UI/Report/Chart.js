import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";

export default function ChartCard() {
    return (
        <Card sx={{ maxWidth: 800 }}>
            <CardContent>
                <Typography sx={{ fontSize: 20,textAlign:'center' }} color="text.secondary" gutterBottom>
                    Net Income
                </Typography>
                <h2 style={{textAlign:'center' }}>
                    35325353563
                </h2>
                <img style={{width:'600px'}} src="https://f20-zpc.zdn.vn/690840431170790638/ecc09ed26f82b5dcec93.jpg"/>
                <hr/>
                <Container>
                    <Row style={{textAlign:'center'}}>
                        <Col>
                            <p>Income</p>
                        </Col>
                        <Col>
                            <p>Expense</p>
                        </Col>
                    </Row>
                    <Row style={{textAlign:'center'}}>
                        <Col>
                            <p style={{color:'blue'}}>+34324243223</p>
                        </Col>
                        <Col>
                            <p style={{color:'red'}}>-4242342355</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <img style={{width:'250px'}}  src="https://f22-zpc.zdn.vn/8465230480166223861/8b6fd1cdc49e1ec0478f.jpg" alt=""/>
                        </Col>
                        <Col>
                            <img style={{width:'250px'}}  src="https://f10-zpc.zdn.vn/8082856519150775601/b2cd571c434f9911c05e.jpg" alt=""/>
                        </Col>
                    </Row>
                </Container>
            </CardContent>
        </Card>
    );
}