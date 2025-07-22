const AboutPage = () => {
  return (
    <section className="mx-auto max-w-3xl px-4 py-10 text-center">
      <h1 className="mb-4 text-3xl font-bold">About Me</h1>
      <p className="mb-4 text-lg">
        Hi! My name is Daria and I went crazy at Rolling Scopes School.
      </p>

      <p className="mb-6">
        This project is part of the{' '}
        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          RS School React course
        </a>
      </p>

      <a
        href="https://github.com/zagorky"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block rounded px-5 py-2 transition"
      >
        My GitHub
      </a>
    </section>
  );
};

export default AboutPage;
