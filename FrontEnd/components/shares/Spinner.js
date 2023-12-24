import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

export default function SpinnerLoading() {
    return (
        <Row>
            <Col xs={1}>
                <Spinner animation="border" variant="primary" />
            </Col>
            <Col xs={11}>
                <span className="text-primary text-center">Loading...</span>
            </Col>
        </Row>
    )
}