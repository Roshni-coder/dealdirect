import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import AuthModal from "../../Components/AuthModal/AuthModal";
import EmailVerificationModal from "../../Components/EmailVerificationModal/EmailVerificationModal";
import {
  AiOutlineCheck,
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineSafetyCertificate,
  AiOutlineHeart,
  AiOutlineBell,
  AiOutlineThunderbolt,
  AiOutlineDollar,
  AiOutlineTeam,
  AiOutlineFileText,
  AiOutlineCamera,
  AiOutlineMessage,
  AiOutlineDashboard,
  AiOutlineLineChart,
} from "react-icons/ai";
import {
  BsShieldCheck,
  BsHouseDoor,
  BsPeople,
  BsGraphUp,
  BsCameraVideo,
  BsCalendarCheck,
  BsChatDots,
  BsStarFill,
} from "react-icons/bs";
import { FaHandshake, FaUserCheck, FaRupeeSign, FaRegHeart } from "react-icons/fa";
import { HiOutlineSparkles, HiOutlineBadgeCheck } from "react-icons/hi";
import { MdOutlineVerified, MdOutlineSpeed, MdOutlinePrivacyTip } from "react-icons/md";

// ============== DATA ==============

const coreFeatures = [
  {
    icon: FaRupeeSign,
    title: "Zero Brokerage",
    description: "Save lakhs! No middlemen means no hefty commissions. Deal directly with owners or buyers.",
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-600",
  },
  {
    icon: MdOutlineVerified,
    title: "Verified Listings",
    description: "Every property goes through our verification process. No fake listings, no spam.",
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
  },
  {
    icon: BsShieldCheck,
    title: "Safe & Secure",
    description: "Your data is protected. Connect with verified users only. Privacy guaranteed.",
    color: "from-purple-500 to-violet-600",
    bgColor: "bg-purple-50",
    textColor: "text-purple-600",
  },
  {
    icon: MdOutlineSpeed,
    title: "Fast & Easy",
    description: "List in 2 minutes. Find properties in seconds. Close deals faster than ever.",
    color: "from-orange-500 to-red-600",
    bgColor: "bg-orange-50",
    textColor: "text-orange-600",
  },
];

const buyerFeatures = [
  {
    icon: AiOutlineSearch,
    title: "Smart Search",
    description: "Powerful filters to find exactly what you need — by location, budget, BHK, amenities & more.",
  },
  {
    icon: AiOutlineBell,
    title: "Instant Alerts",
    description: "Get notified immediately when a new property matches your criteria. Never miss a deal.",
  },
  {
    icon: AiOutlineHeart,
    title: "Save & Compare",
    description: "Shortlist your favorite properties and compare them side-by-side to make the best choice.",
  },
  {
    icon: BsCameraVideo,
    title: "Virtual Tours",
    description: "Experience properties from home with 3D walkthroughs and virtual tours before visiting.",
  },
  {
    icon: FaHandshake,
    title: "Direct Contact",
    description: "Chat directly with property owners. No brokers in between. Get answers instantly.",
  },
  {
    icon: AiOutlineFileText,
    title: "Easy Agreements",
    description: "Generate rental agreements online. No legal hassles. Everything in one place.",
  },
];

const ownerFeatures = [
  {
    icon: AiOutlineThunderbolt,
    title: "List in 2 Minutes",
    description: "Quick and easy listing process. Add photos, details, and go live instantly.",
  },
  {
    icon: BsPeople,
    title: "Quality Leads",
    description: "Connect with serious, verified buyers and tenants. No spam, no time-wasters.",
  },
  {
    icon: AiOutlineDashboard,
    title: "Owner Dashboard",
    description: "Manage all your properties, enquiries, and leads from a single powerful dashboard.",
  },
  {
    icon: AiOutlineLineChart,
    title: "Lead Analytics",
    description: "Track views, enquiries, and engagement. Know what's working and optimize.",
  },
  {
    icon: BsChatDots,
    title: "In-App Messaging",
    description: "Chat with potential buyers/tenants securely within the app. All in one place.",
  },
  {
    icon: HiOutlineBadgeCheck,
    title: "Verified Badge",
    description: "Get verified as a trusted owner. Stand out and build trust with seekers.",
  },
];

const stats = [
  { value: "50,000+", label: "Active Listings" },
  { value: "₹0", label: "Brokerage Fee" },
  { value: "2 Lakhs+", label: "Happy Users" },
  { value: "30 Sec", label: "Avg. Response Time" },
];

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Home Buyer, Mumbai",
    text: "Found my dream 2BHK in just 3 days! No broker fees saved me over ₹1.5 lakhs. DealDirect is a game changer!",
    rating: 5,
  },
  {
    name: "Rajesh Kumar",
    role: "Property Owner, Bangalore",
    text: "Listed my flat and got 50+ genuine enquiries in the first week. The owner dashboard is super helpful!",
    rating: 5,
  },
  {
    name: "Anita Desai",
    role: "Tenant, Pune",
    text: "The smart search helped me find a pet-friendly flat near my office. Moved in within 2 weeks!",
    rating: 5,
  },
];

// ============== COMPONENTS ==============

const FeatureCard = ({ feature, index }) => {
  const IconComponent = feature.icon;

  return (
    <div className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300">
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${feature.bgColor || "bg-red-50"} mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <IconComponent className={`w-6 h-6 ${feature.textColor || "text-red-600"}`} />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
      <p className="text-sm text-slate-600">{feature.description}</p>
    </div>
  );
};

const CoreFeatureCard = ({ feature }) => {
  const IconComponent = feature.icon;

  return (
    <div className="relative bg-white rounded-3xl p-8 border border-slate-200 hover:shadow-xl transition-all duration-300 group overflow-hidden">
      {/* Gradient overlay on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
        <IconComponent className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
      <p className="text-slate-600">{feature.description}</p>
    </div>
  );
};

const TestimonialCard = ({ testimonial }) => (
  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
    {/* Stars */}
    <div className="flex gap-1 mb-4">
      {[...Array(testimonial.rating)].map((_, i) => (
        <BsStarFill key={i} className="w-4 h-4 text-amber-400" />
      ))}
    </div>
    <p className="text-slate-700 mb-4 italic">"{testimonial.text}"</p>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center text-white font-bold">
        {testimonial.name.charAt(0)}
      </div>
      <div>
        <p className="font-semibold text-slate-900">{testimonial.name}</p>
        <p className="text-xs text-slate-500">{testimonial.role}</p>
      </div>
    </div>
  </div>
);

// ============== MAIN COMPONENT ==============

const API_BASE = import.meta.env.VITE_API_BASE;

const WhyUs = () => {
  const [activeTab, setActiveTab] = useState("buyers");
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const navigate = useNavigate();

  // Sync user from localStorage
  useEffect(() => {
    const syncUser = () => {
      try {
        const storedUser = localStorage.getItem("user");
        setUser(storedUser ? JSON.parse(storedUser) : null);
      } catch (error) {
        setUser(null);
      }
    };
    syncUser();
    window.addEventListener("storage", syncUser);
    window.addEventListener("auth-change", syncUser);
    return () => {
      window.removeEventListener("storage", syncUser);
      window.removeEventListener("auth-change", syncUser);
    };
  }, []);

  // Handler for List Property button (same logic as Navbar)
  const handleListProperty = async () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    const userRole = (user.role || "user").toLowerCase();

    // Buyer needs to verify email first
    if (userRole === "user") {
      setIsVerificationModalOpen(true);
      return;
    }

    // Agent can list freely
    if (userRole === "agent") {
      navigate("/add-property");
      return;
    }

    // Owner: check 1 property limit (free tier)
    if (userRole === "owner") {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthModalOpen(true);
        return;
      }

      try {
        const res = await axios.get(`${API_BASE}/api/properties/my-properties`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const count =
          typeof res.data?.count === "number"
            ? res.data.count
            : Array.isArray(res.data?.data)
              ? res.data.data.length
              : 0;

        if (count >= 1) {
          toast.info(
            "You can list only one property for free. Please upgrade your plan or edit your existing listing."
          );
          navigate("/my-properties");
          return;
        }
      } catch (error) {
        console.error("Error checking existing properties:", error);
      }

      navigate("/add-property");
    }
  };

  const handleVerificationSuccess = () => {
    navigate("/add-property");
  };

  return (
    <>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
      <EmailVerificationModal
        isOpen={isVerificationModalOpen}
        onClose={() => setIsVerificationModalOpen(false)}
        user={user}
        onVerified={handleVerificationSuccess}
      />
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24">
          {/* Background Decorations */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-red-100/50 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-blue-100/50 blur-3xl" />
          </div>

          <div className="relative max-w-6xl mx-auto px-4">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 text-red-700 text-sm font-semibold mb-6">
                <HiOutlineSparkles className="w-4 h-4" />
                India's Fastest Growing No-Broker Platform
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
                Why Choose{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-600">
                  DealDirect?
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
                We connect property owners directly with buyers and tenants.
                No brokers, no commissions, no hidden fees — just simple, transparent real estate.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 text-center border border-slate-200 shadow-sm">
                  <p className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-600 mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-slate-600">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Core Features */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
              {coreFeatures.map((feature, index) => (
                <CoreFeatureCard key={index} feature={feature} />
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section with Toggle */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Built for Everyone
              </h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto mb-8">
                Whether you're looking for your dream home or trying to find the perfect tenant,
                DealDirect has you covered.
              </p>

              {/* Toggle */}
              <div className="inline-flex items-center p-1.5 bg-slate-100 rounded-2xl shadow-inner">
                <button
                  onClick={() => setActiveTab("buyers")}
                  className={`relative px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === "buyers"
                    ? "bg-white text-slate-900 shadow-md"
                    : "text-slate-500 hover:text-slate-700"
                    }`}
                >
                  <span className="flex items-center gap-2">
                    <AiOutlineSearch className="w-4 h-4" />
                    For Buyers & Tenants
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab("owners")}
                  className={`relative px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === "owners"
                    ? "bg-white text-slate-900 shadow-md"
                    : "text-slate-500 hover:text-slate-700"
                    }`}
                >
                  <span className="flex items-center gap-2">
                    <BsHouseDoor className="w-4 h-4" />
                    For Property Owners
                  </span>
                </button>
              </div>
            </div>

            {/* Feature Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {(activeTab === "buyers" ? buyerFeatures : ownerFeatures).map((feature, index) => (
                <FeatureCard key={index} feature={feature} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-semibold mb-4">
                <FaRegHeart className="w-4 h-4" />
                Loved by Thousands
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                What Our Users Say
              </h2>
              <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                Don't just take our word for it. Here's what real users have to say about DealDirect.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                How It Works
              </h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                Getting started with DealDirect is simple. Here's how:
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {/* Step 1 */}
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-red-600">1</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Sign Up Free</h3>
                <p className="text-sm text-slate-600">Create your free account in under 30 seconds. No credit card required.</p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-red-600">2</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Search or List</h3>
                <p className="text-sm text-slate-600">Browse properties with smart filters or list your own in just 2 minutes.</p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-red-600">3</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Connect & Close</h3>
                <p className="text-sm text-slate-600">Chat directly with owners or tenants. Close the deal without paying brokerage!</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-20 bg-gradient-to-r from-red-500 to-rose-600">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of happy users who are saving money and finding properties faster with DealDirect.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/properties"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-red-600 rounded-xl font-bold text-lg hover:bg-slate-50 transition-colors shadow-lg w-full sm:w-auto justify-center"
              >
                <AiOutlineSearch className="w-5 h-5" />
                Browse Properties
              </Link>
              <button
                onClick={handleListProperty}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-colors border border-white/20 w-full sm:w-auto justify-center"
              >
                <AiOutlineHome className="w-5 h-5" />
                List Your Property
              </button>
            </div>
          </div>
        </section>

        {/* Bottom Links */}
        <section className="py-12 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/pricing"
                className="inline-flex items-center gap-2 text-slate-600 hover:text-red-600 font-medium transition-colors"
              >
                View Pricing & Plans
                <span>→</span>
              </Link>
              <span className="hidden sm:block text-slate-300">|</span>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-slate-600 hover:text-red-600 font-medium transition-colors"
              >
                Contact Us
                <span>→</span>
              </Link>
              <span className="hidden sm:block text-slate-300">|</span>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-slate-600 hover:text-red-600 font-medium transition-colors"
              >
                About DealDirect
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default WhyUs;
