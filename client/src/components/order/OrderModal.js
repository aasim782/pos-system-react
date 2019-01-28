import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Container,
  FormGroup,
  Label,
  Input,
  Table
} from "reactstrap";
import { connect } from "react-redux";
import { getItems } from "../../actions/itemActions";
import { getOrder } from "../../actions/orderActions";

class OrderModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modal,
      selectedItem: "1",
      order: {}
    };
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
    this.props.toggleModalState();
  };

  componentDidMount() {
    this.props.getItems();
    this.props.getOrder(this.props.orderNo);
  }

  onItemChange = e => {
    this.setState({ selectedItem: e.target.value });
  };

  render() {
    const removeItem = (
      <Button className="remove-btn" size="sm" color="danger" outline>
        &times;
      </Button>
    );

    const itemsList = this.props.items.map(({ item_id, name }) => (
      <option key={item_id} value={item_id}>
        {name}
      </option>
    ));

    const unitPrice = this.props.items.map(
      ({ item_id, unit_price }) =>
        item_id == this.state.selectedItem && (
          <Label key={item_id}>{unit_price}</Label>
        )
    );

    return (
      <Container>
        <Modal size="lg" isOpen={this.props.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Order #{this.props.orderNo}
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <Table responsive>
                <thead>
                  <tr>
                    <th />
                    <th>Item</th>
                    <th>Unit Price</th>
                    <th>Qty</th>
                    <th>Rs.</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>{removeItem}</td>
                    <td>
                      <FormGroup>
                        <Input
                          type="select"
                          name="select"
                          id="itemSelect"
                          onChange={this.onItemChange}
                        >
                          {itemsList}
                        </Input>
                      </FormGroup>
                    </td>
                    <td>{unitPrice}</td>
                    <td>
                      <Input
                        type="number"
                        name="qty"
                        id="qty"
                        style={{ width: "6vw" }}
                      />
                    </td>
                    <td>30.00</td>
                  </tr>

                  <tr>
                    <td />
                    <td />
                    <td />
                    <td />
                    <td>
                      <FormGroup>
                        <Label> 50.00</Label>
                      </FormGroup>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <Button
                className="float-right"
                color="primary"
                size="lg"
                style={{ marginTop: "2rem", width: "10vw" }}
                onClick={this.toggle}
              >
                Save
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  items: state.item.items,
  order: state.order.order
});

export default connect(
  mapStateToProps,
  { getItems, getOrder }
)(OrderModal);
