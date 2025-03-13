export default function BusinessFeatures() {
    return (
      <section className="py-16 text-center px-6">
        <h3 className="text-3xl font-bold">About Our Business</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
          <div>
            <h4 className="text-xl font-bold">Integrated Solutions</h4>
            <p className="text-gray-600">
              All your business processes in one powerful platform.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-bold">Secure & Reliable</h4>
            <p className="text-gray-600">
              Enterprise-grade security for your critical business data.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-bold">24/7 Support</h4>
            <p className="text-gray-600">
              Expert assistance available whenever you need it.
            </p>
          </div>
        </div>
      </section>
    );
  }
  