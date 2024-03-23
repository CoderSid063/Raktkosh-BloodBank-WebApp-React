import "../styles/ContactUs.css";
const ContactUs = () => {
  return (
    <div className="container">
      <div className="content">
        <div className="left-side">
          <div className="address details">
            <i className="fas fa-map-marker-alt"></i>
            <div className="topic">Address</div>
            <div className="text-one">Bhubaneswar</div>
            <div className="text-two">Gita collage</div>
          </div>
          <div className="phone details">
            <i className="fas fa-phone-alt"></i>
            <div className="topic">Phone</div>
            <div className="text-one">8327746884</div>
            <div className="text-two">9348514781</div>
          </div>
          <div className="email details">
            <i className="fas fa-envelope"></i>
            <div className="topic">6371300985</div>
            <div className="text-one">s4sambit632@gmail.com</div>
            <div className="text-two"></div>
          </div>
        </div>
        <div className="right-side">
          <div className="topic-text">send us a message </div>
          <p>
            if you have any issue in website or any type of quries related about
            our service,you can send msg from here.its our pleasure to help you
          </p>
          <form action="#">
            <div className="input-box">
              <input type="text" placeholder="Enter your name" />
            </div>
            <div className="input-box">
              <input type="text" placeholder="Enter your email" />
            </div>
            <div className="input-box message-box">
              <textarea></textarea>
            </div>
            <div className="button">
              <input type="button" value="Send Now" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
