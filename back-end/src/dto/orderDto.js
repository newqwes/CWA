class OrderDto {
  id;

  userId;

  date;

  name;

  price;

  count;

  constructor(model) {
    this.id = model.id;
    this.userId = model.userId;
    this.date = model.date;
    this.name = model.name;
    this.price = model.price;
    this.count = model.count;
  }
}

export default OrderDto;
