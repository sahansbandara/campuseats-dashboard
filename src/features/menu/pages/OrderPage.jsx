import { useState } from "react";

function OrderPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    qty: 1,
  });

  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  function validate(values) {
    const foundErrors = {};

    if (values.name.trim().length < 2) {
      foundErrors.name = "Name too short";
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email)) {
      foundErrors.email = "Enter a valid email";
    }

    if (Number(values.qty) < 1) {
      foundErrors.qty = "Qty must be ≥ 1";
    }

    return foundErrors;
  }

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const foundErrors = validate(form);
    setErrors(foundErrors);

    if (Object.keys(foundErrors).length === 0) {
      setDone(true);
    }
  }

  if (done) {
    return <p>Thanks, {form.name}! Order received.</p>;
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2>Place Order</h2>

      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <span> {errors.name}</span>}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <span> {errors.email}</span>}
      </div>

      <div>
        <label htmlFor="qty">Quantity</label>
        <input
          id="qty"
          name="qty"
          type="number"
          value={form.qty}
          onChange={handleChange}
        />
        {errors.qty && <span> {errors.qty}</span>}
      </div>

      <button type="submit">Place order</button>
    </form>
  );
}

export default OrderPage;