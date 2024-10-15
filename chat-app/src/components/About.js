import Page from "./Page";

export default function AboutUs() {
  return (
    <Page title='About Us'>
      <h1>About Us</h1>
      <p className="lead text-muted">
        Welcome to ChatApp, where communication meets innovation. Our platform
        is designed to bring people closer together, making conversations
        seamless, secure, and fun. Whether you are connecting with friends,
        family, or colleagues, we are here to make every chat a memorable
        experience.
      </p>
      <h4>Why Choose Us?</h4>
      <ul>
        <li>
          <p>
            <span className="font-weight-bold">Secure Conversations: </span>Your
            privacy is our top priority. We use state-of-the-art encryption to
            ensure that your messages are safe and secure.
          </p>
        </li>
        <li>
          <p>
            <span className="font-weight-bold">User-Friendly Interface: </span>
            Our intuitive design makes it easy for everyone to use, from
            tech-savvy individuals to those new to digital communication.
          </p>
        </li>
        <li>
          <p>
            <span className="font-weight-bold">Innovative Features: </span>Enjoy
            a variety of features including video calls, voice messages, group
            chats, and more. We continuously update our app to bring you the
            latest in communication technology.
          </p>
        </li>
        <li>
          <p>
            <span className="font-weight-bold">Global Connectivity: </span>{" "}
            Connect with anyone, anywhere in the world. Our app supports
            multiple languages and is optimized for use in various regions.
          </p>
        </li>
      </ul>
      <h4>{' '} Our Story</h4>
      <p className="container container--narrow">
        Founded in 2024, ChatApp started with a simple idea: to make
        communication easier and more enjoyable. What began as a small project
        has grown into a dynamic platform used by millions around the globe. We
        are passionate about bringing people together and are constantly
        striving to enhance the way we communicate in the digital age.
      </p>
      <h4>{' '}Join Us</h4>
      <p className="container container--narrow">
        Be part of a community that values connection, innovation, and privacy.
        Download ChatApp today and start experiencing the future of
        communication.
      </p>
    </Page>
  );
}
