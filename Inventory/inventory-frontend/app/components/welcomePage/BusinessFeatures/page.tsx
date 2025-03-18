export default function BusinessFeatures() {
  return (
    <>
      {/* Business Type Section */}
      <section className="bg-white py-6">
        <h3 className="text-2xl font-bold text-[#334155] text-center mb-8">
          Designed for All Business Models
        </h3>

        <div className="flex justify-center gap-x-16 py-8">
          {/* E-commerce Icon */}
          <div className="flex flex-col items-center">
            <div className="relative w-[120px] h-[120px]">
              <div className="absolute inset-0 rounded-full bg-[#f1f5f9]"></div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-[50px] h-[40px] bg-[#64748b] rounded relative">
                  <div className="absolute left-[5px] top-[5px] w-[30px] h-[20px] bg-white rounded"></div>
                  <div className="absolute left-0 bottom-[-15px] w-[50px] h-[15px] bg-[#64748b]" style={{ clipPath: "polygon(0 0, 100% 0, 90% 100%, 10% 100%)" }}></div>
                </div>
              </div>
            </div>
            <span className="text-xl font-bold text-[#334155] mt-8">E-Commerce</span>
          </div>

          {/* Retail Icon */}
          <div className="flex flex-col items-center">
            <div className="relative w-[120px] h-[120px]">
              <div className="absolute inset-0 rounded-full bg-[#f1f5f9]"></div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-[20px] h-[40px] bg-[#64748b] ml-[10px]"></div>
                <div className="w-[60px] h-[40px] bg-[#64748b] mt-0" style={{ clipPath: "polygon(0 0, 100% 0, 83% 100%, 17% 100%)" }}></div>
              </div>
            </div>
            <span className="text-xl font-bold text-[#334155] mt-8">Retail</span>
          </div>

          {/* Service Icon */}
          <div className="flex flex-col items-center">
            <div className="relative w-[120px] h-[120px]">
              <div className="absolute inset-0 rounded-full bg-[#f1f5f9]"></div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-[30px] h-[30px] rounded-full bg-[#64748b] mx-auto mb-[5px]"></div>
                <div className="w-[60px] h-[30px] bg-[#64748b] rounded-b-full"></div>
              </div>
            </div>
            <span className="text-xl font-bold text-[#334155] mt-8">Services</span>
          </div>

          {/* Manufacturing Icon */}
          <div className="flex flex-col items-center">
            <div className="relative w-[120px] h-[120px]">
              <div className="absolute inset-0 rounded-full bg-[#f1f5f9]"></div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="flex gap-[10px] mb-[10px] justify-center">
                  <div className="w-[10px] h-[10px] bg-[#64748b]"></div>
                  <div className="w-[10px] h-[10px] bg-[#64748b]"></div>
                </div>
                <div className="w-[40px] h-[30px] bg-[#64748b] mx-auto"></div>
                <div className="w-[50px] h-[10px] bg-[#64748b] mx-auto mt-0"></div>
              </div>
            </div>
            <span className="text-xl font-bold text-[#334155] mt-8">Manufacturing</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-[#f8fafc]">
        <h3 className="text-3xl font-bold text-[#334155] text-center mb-14">Core Features</h3>

        <div className="flex justify-center gap-x-8 px-8">
          {/* Feature 1 */}
          <div className="bg-white border border-[#e2e8f0] rounded-lg p-6 w-[280px] h-[300px] flex flex-col items-center">
            <div className="relative mb-8">
              <div className="w-[60px] h-[60px] rounded-full bg-[#f1f5f9]"></div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-[20px] h-[30px] bg-[#64748b]" style={{ clipPath: "polygon(0 33%, 50% 0, 100% 33%, 100% 100%, 0 100%)" }}></div>
              </div>
            </div>
            <h4 className="text-xl font-bold text-[#334155] mb-2">Integrated Solutions</h4>
            <p className="text-base text-[#64748b] text-center">
              All your business processes<br />
              in one powerful platform,<br />
              from inventory to finances.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white border border-[#e2e8f0] rounded-lg p-6 w-[280px] h-[300px] flex flex-col items-center">
            <div className="relative mb-8">
              <div className="w-[60px] h-[60px] rounded-full bg-[#f1f5f9]"></div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-[40px] h-[30px] bg-[#64748b]" style={{ clipPath: "polygon(0 0, 100% 0, 100% 33%, 100% 33%, 100% 66%, 0 66%, 0 33%, 0 33%)" }}></div>
              </div>
            </div>
            <h4 className="text-xl font-bold text-[#334155] mb-2">Secure & Reliable</h4>
            <p className="text-base text-[#64748b] text-center">
              Enterprise-grade security<br />
              for your critical business<br />
              data and operations.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white border border-[#e2e8f0] rounded-lg p-6 w-[280px] h-[300px] flex flex-col items-center">
            <div className="relative mb-8">
              <div className="w-[60px] h-[60px] rounded-full bg-[#f1f5f9]"></div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-[40px] h-[40px] bg-[#64748b] rounded-full relative">
                  <div className="absolute left-1/2 top-[10px] -translate-x-1/2 w-[6px] h-[6px] bg-white rounded-full"></div>
                  <div className="absolute left-1/2 top-[20px] -translate-x-1/2 w-[2px] h-[10px] bg-white"></div>
                </div>
              </div>
            </div>
            <h4 className="text-xl font-bold text-[#334155] mb-2">24/7 Support</h4>
            <p className="text-base text-[#64748b] text-center">
              Expert assistance available<br />
              whenever you need it<br />
              through multiple channels.
            </p>
          </div>
        </div>
      </section>

      {/* Industry Solutions Section */}
      <section className="py-16 bg-white">
        <h3 className="text-3xl font-bold text-[#334155] text-center mb-12">Industry-Specific Solutions</h3>

        <div className="flex justify-center px-8">
          <div className="grid grid-cols-2 gap-x-32 gap-y-6">
            <div className="flex items-start gap-2">
              <span className="text-lg text-[#334155]">• Real-time inventory tracking and management</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-lg text-[#334155]">• Production planning and scheduling</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-lg text-[#334155]">• Order processing and fulfillment automation</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-lg text-[#334155]">• Financial management and reporting</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-lg text-[#334155]">• Supply chain visibility and optimization</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-lg text-[#334155]">• Service appointment scheduling</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-lg text-[#334155]">• Customer relationship management</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-lg text-[#334155]">• Analytics and business intelligence</span>
            </div>
          </div>
        </div>

        {/* Call-to-action Section */}
        <div className="flex justify-center mt-16">
          <div className="bg-black rounded-lg p-6 text-center w-[800px] h-[120px]">
            <h3 className="text-2xl font-bold text-white mb-2">Ready to transform your business?</h3>
            <button className="bg-white text-black font-bold py-3 px-6 rounded w-[300px] mt-2">
              Get Started Today
            </button>
          </div>
        </div>
      </section>
    </>
  );
}