function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About LocalEvents</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <p className="text-gray-700 mb-4">
          LocalEvents is your go-to platform for discovering exciting events in your area. 
          We connect local event organizers with people looking for unique experiences.
        </p>
        <p className="text-gray-700 mb-4">
          Whether you're interested in music, food, art, or community gatherings, 
          we've got something for everyone.
        </p>
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-700">
            Email: contact@localevents.com<br />
            Phone: (555) 123-4567<br />
            Address: 123 Main Street, Anytown, USA
          </p>
        </div>
      </div>
    </div>
  );
}

export default About; 