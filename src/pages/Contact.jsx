const Contact = () => {
  return (
    <div>
      <h1>Contact Page</h1>
      <form>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" />
        <label htmlFor="message">Message</label>
        <textarea id="message"></textarea>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Contact;
