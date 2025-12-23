import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineCheck,
  AiOutlineStar,
  AiOutlineThunderbolt,
  AiOutlineRocket,
  AiOutlineCrown,
  AiOutlineHome,
  AiOutlineTrophy,
  AiOutlineGift,
  AiOutlineShareAlt,
  AiOutlineSafetyCertificate,
  AiOutlineCamera,
  AiOutlineLineChart,
  AiOutlineTeam,
  AiOutlinePercentage
} from "react-icons/ai";
import {
  BsShieldCheck,
  BsHouseDoor,
  BsBuilding,
  BsPeople,
  BsGraphUp,
  BsCameraVideo,
  BsCalculator,
  BsTruck,
  BsBank,
  BsBadgeAd
} from "react-icons/bs";
import { FaGraduationCap, FaUsers, FaHandshake } from "react-icons/fa";
import { HiOutlineSparkles, HiOutlineBadgeCheck } from "react-icons/hi";
import { MdOutlineVerified, MdOutlineAnalytics } from "react-icons/md";

// ============== DATA ==============

const listingPlans = [
  {
    id: "free",
    name: "Free Plan",
    price: "₹0",
    period: "",
    bestFor: "First-time sellers, renters",
    isPopular: false,
    icon: AiOutlineHome,
    gradient: "from-slate-500 to-slate-600",
    features: [
      "1 active listing",
      "5 photos maximum",
      "15-day visibility",
      "Limited inquiries",
      "Basic search placement",
      "Email notifications only",
    ],
  },
  {
    id: "starter",
    name: "Starter Plan",
    price: "₹299",
    period: "/ listing",
    bestFor: "Owners wanting faster leads",
    isPopular: false,
    icon: AiOutlineStar,
    gradient: "from-blue-500 to-blue-600",
    features: [
      "Featured placement (7 days)",
      "Unlimited photos",
      "30-day visibility",
      "Lead alerts on WhatsApp",
      "Price-drop insights",
      "Enhanced search ranking",
    ],
  },
  {
    id: "premium",
    name: "Premium Plan",
    price: "₹599",
    period: "/ listing",
    bestFor: "Serious property owners",
    isPopular: true,
    icon: AiOutlineTrophy,
    gradient: "from-red-500 to-rose-600",
    features: [
      "Top-of-page rotation",
      "45-day visibility",
      "Unlimited inquiries",
      "Verified owner badge",
      "Daily auto-refresh",
      "Priority support",
    ],
  },
  {
    id: "superboost",
    name: "SuperBoost Plan",
    price: "₹999",
    period: "/ listing",
    bestFor: "Owners wanting guaranteed traction",
    isPopular: false,
    icon: AiOutlineRocket,
    gradient: "from-purple-500 to-violet-600",
    features: [
      "Always in top results",
      "60-day premium visibility",
      "Social media promotion",
      "Lead guarantee",
      "3D/virtual tour add-on option",
      "Dedicated listing support",
    ],
  },
];

const subscriptionPlans = [
  {
    id: "basic",
    name: "Basic",
    price: "₹499",
    period: "/ month",
    bestFor: "Regular landlords",
    isPopular: false,
    icon: BsHouseDoor,
    gradient: "from-emerald-500 to-teal-600",
    features: [
      "10 listings/month",
      "Basic analytics dashboard",
      "Unlimited photos",
      "Lead routing system",
      "Email support",
      "Standard listing visibility",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    price: "₹1,499",
    period: "/ month",
    bestFor: "Multi-property owners",
    isPopular: true,
    icon: BsGraphUp,
    gradient: "from-red-500 to-rose-600",
    features: [
      "50 listings/month",
      "Advanced analytics",
      "Auto-refresh on all listings",
      "Priority support",
      "WhatsApp lead alerts",
      "Featured placement boost",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "₹4,999",
    period: "/ month",
    bestFor: "Large owners & small builders",
    isPopular: false,
    icon: AiOutlineCrown,
    gradient: "from-amber-500 to-orange-600",
    features: [
      "200 listings",
      "Dedicated success manager",
      "Listing performance heatmaps",
      "Early access to buyer demand trends",
      "Bulk listing tools",
      "Custom branding options",
    ],
  },
];

const addonServices = [
  {
    id: "verification",
    name: "Verification Badge",
    description: "Owner verification, document check",
    price: "₹249–₹399",
    whoPays: "Owner",
    icon: BsShieldCheck,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    id: "tenant-screening",
    name: "Tenant Screening",
    description: "ID check + past rental behavior",
    price: "₹249",
    whoPays: "Tenant",
    icon: BsPeople,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    id: "virtual-tour",
    name: "Virtual Tour / 3D",
    description: "Professionally shot virtual home tour",
    price: "₹999–₹2,999",
    whoPays: "Owner",
    icon: BsCameraVideo,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    id: "premium-insights",
    name: "Premium Insights",
    description: "Price trends + locality insights",
    price: "₹79/month",
    whoPays: "Buyer",
    icon: MdOutlineAnalytics,
    color: "text-rose-600",
    bgColor: "bg-rose-50",
  },
  {
    id: "loan-check",
    name: "Loan Eligibility Check",
    description: "Bank partner integration for home loans",
    price: "Free for users",
    whoPays: "Bank pays commission",
    icon: BsBank,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
  },
  {
    id: "home-services",
    name: "Home Services",
    description: "Movers, cleaning, painting, interiors",
    price: "15–25% commission",
    whoPays: "Service Provider",
    icon: BsTruck,
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
  },
];

const referralTypes = [
  {
    type: "Owner Referral",
    whoCanRefer: "Anyone (owner or non-owner)",
    whatTheyDo: "Share link with someone who lists a property",
    referrerReward: "₹100 credit OR 1 Featured boost",
    newOwnerReward: "Free Featured upgrade",
    icon: AiOutlineHome,
    color: "from-red-500 to-rose-600",
  },
  {
    type: "Society Referral",
    whoCanRefer: "Any resident of a society",
    whatTheyDo: "Invite owners from the same building",
    referrerReward: "₹500 per verified listing",
    newOwnerReward: "Free verification",
    icon: BsBuilding,
    color: "from-blue-500 to-indigo-600",
  },
  {
    type: "Tenant Referral",
    whoCanRefer: "Any tenant",
    whatTheyDo: "Tell an owner about DealDirect",
    referrerReward: "₹100 voucher",
    newOwnerReward: "Free ad refresh (7 days)",
    icon: FaUsers,
    color: "from-emerald-500 to-teal-600",
  },
  {
    type: "Partner Referral",
    whoCanRefer: "Photographers, movers, service providers",
    whatTheyDo: "Refer owners preparing to rent/sell",
    referrerReward: "₹150 per verified listing",
    newOwnerReward: "₹100 off verification",
    icon: FaHandshake,
    color: "from-purple-500 to-violet-600",
  },
  {
    type: "Campus Referral",
    whoCanRefer: "Students, interns",
    whatTheyDo: "Share link with owners renting near campuses",
    referrerReward: "₹50 wallet credit",
    newOwnerReward: "Priority listing for 7 days",
    icon: FaGraduationCap,
    color: "from-amber-500 to-orange-600",
  },
  {
    type: "Social Sharing",
    whoCanRefer: "Any user",
    whatTheyDo: "Share referral link online",
    referrerReward: "₹50 credit per new listing generated",
    newOwnerReward: "₹50 discount on verification",
    icon: AiOutlineShareAlt,
    color: "from-pink-500 to-rose-600",
  },
];

const revenueStreams = [
  {
    name: "Freemium Listings",
    description: "Basic listing free; paid tiers for visibility",
    pricing: "Free → ₹299 → ₹999 per listing",
    whoPays: "Property Owners",
    icon: AiOutlineHome,
  },
  {
    name: "Lead Packs",
    description: "Verified leads for rent/sale; no brokers",
    pricing: "Rent: ₹20–₹50/lead • Sale: ₹100–₹200/lead",
    whoPays: "Owners",
    icon: BsPeople,
  },
  {
    name: "DealSuccess Fee",
    description: "Only if a deal closes through the platform",
    pricing: "Rent: 10–20% of 1-month rent • Sale: 0.5%",
    whoPays: "Owners (Optional)",
    icon: FaHandshake,
  },
  {
    name: "Home Services Marketplace",
    description: "Movers, cleaners, inspections, painting, interiors",
    pricing: "15–25% commission",
    whoPays: "Service providers",
    icon: BsTruck,
  },
  {
    name: "Loan Partnerships",
    description: "Home loan lead monetization",
    pricing: "₹1,000–₹4,000 per approved loan",
    whoPays: "Partner Banks",
    icon: BsBank,
  },
  {
    name: "Advertisements",
    description: "Project ads, banners, featured home services",
    pricing: "₹15,000–₹50,000 per month",
    whoPays: "Brands & Service Providers",
    icon: BsBadgeAd,
  },
];

// ============== COMPONENTS ==============

const PricingCard = ({ plan, isSubscription = false }) => {
  const IconComponent = plan.icon;
  const isCurrentPlan = plan.id === "free"; // Free plan is current for non-subscribed users

  return (
    <div
      className={`relative bg-white rounded-3xl p-6 lg:p-8 flex flex-col h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${isCurrentPlan
        ? "border-2 border-emerald-500 shadow-xl shadow-emerald-100"
        : plan.isPopular
          ? "border-2 border-red-500 shadow-xl shadow-red-100"
          : "border border-slate-200 shadow-lg"
        }`}
    >
      {/* Current Plan Badge */}
      {isCurrentPlan && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-bold shadow-lg">
            <AiOutlineCheck className="w-3.5 h-3.5" />
            CURRENT PLAN
          </span>
        </div>
      )}

      {/* Popular Badge */}
      {plan.isPopular && !isCurrentPlan && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-500 to-rose-600 text-white text-xs font-bold shadow-lg">
            <HiOutlineSparkles className="w-3.5 h-3.5" />
            MOST POPULAR
          </span>
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.gradient} text-white mb-4 shadow-lg`}>
          <IconComponent className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
        <p className="text-sm text-slate-500 mt-1">{plan.bestFor}</p>
      </div>

      {/* Price */}
      <div className="mb-6 pb-6 border-b border-slate-100">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-extrabold text-slate-900">{plan.price}</span>
          <span className="text-slate-500 text-sm font-medium">{plan.period}</span>
        </div>
      </div>

      {/* Features */}
      <ul className="space-y-3 flex-1 mb-6">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${plan.gradient} flex items-center justify-center mt-0.5`}>
              <AiOutlineCheck className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm text-slate-600">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      {isCurrentPlan ? (
        <button
          disabled
          className="w-full py-3.5 rounded-xl font-bold text-sm bg-emerald-100 text-emerald-700 cursor-default flex items-center justify-center gap-2"
        >
          <AiOutlineCheck className="w-4 h-4" />
          Current Plan
        </button>
      ) : (
        <button
          className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-300 ${plan.isPopular
            ? "bg-gradient-to-r from-red-500 to-rose-600 text-white hover:opacity-90 shadow-lg shadow-red-200"
            : "bg-slate-900 text-white hover:bg-slate-800"
            }`}
        >
          {plan.price === "₹0" ? "Get Started Free" : "Upgrade Now"}
        </button>
      )}
    </div>
  );
};

const AddonCard = ({ addon }) => {
  const IconComponent = addon.icon;

  return (
    <div className="group bg-white rounded-2xl p-5 border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${addon.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <IconComponent className={`w-6 h-6 ${addon.color}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-slate-900 mb-1">{addon.name}</h4>
          <p className="text-sm text-slate-500 mb-2">{addon.description}</p>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex px-2.5 py-1 rounded-lg bg-slate-100 text-sm font-bold text-slate-700">
              {addon.price}
            </span>
            <span className="text-xs text-slate-400">• Paid by {addon.whoPays}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ReferralCard = ({ referral }) => {
  const IconComponent = referral.icon;

  return (
    <div className="group bg-white rounded-2xl p-5 border border-slate-200 hover:shadow-lg transition-all duration-300">
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${referral.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <IconComponent className="w-5 h-5" />
      </div>
      <h4 className="font-bold text-slate-900 mb-1">{referral.type}</h4>
      <p className="text-xs text-slate-500 mb-3">{referral.whoCanRefer}</p>
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-emerald-600 font-semibold">You Earn:</span>
          <span className="text-slate-700">{referral.referrerReward}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-blue-600 font-semibold">They Get:</span>
          <span className="text-slate-700">{referral.newOwnerReward}</span>
        </div>
      </div>
    </div>
  );
};

// ============== MAIN COMPONENT ==============

const Pricing = () => {
  const [activeTab, setActiveTab] = useState("listing");

  return (
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
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 text-red-700 text-sm font-semibold mb-6">
              <HiOutlineBadgeCheck className="w-4 h-4" />
              No Hidden Fees • No Brokerage
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-4 leading-tight">
              Simple, Transparent
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-600">
                Pricing & Plans
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
              DealDirect keeps the core experience accessible for everyone. Choose a plan
              that fits your needs — no lock-ins, cancel anytime.
            </p>
          </div>

          {/* Toggle Switch */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center p-1.5 bg-slate-100 rounded-2xl shadow-inner">
              <button
                onClick={() => setActiveTab("listing")}
                className={`relative px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === "listing"
                  ? "bg-white text-slate-900 shadow-md"
                  : "text-slate-500 hover:text-slate-700"
                  }`}
              >
                <span className="flex items-center gap-2">
                  <AiOutlineHome className="w-4 h-4" />
                  Listing Plans
                </span>
              </button>
              <button
                onClick={() => setActiveTab("subscription")}
                className={`relative px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === "subscription"
                  ? "bg-white text-slate-900 shadow-md"
                  : "text-slate-500 hover:text-slate-700"
                  }`}
              >
                <span className="flex items-center gap-2">
                  <AiOutlineCrown className="w-4 h-4" />
                  Owner Subscriptions
                </span>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className={`grid gap-6 ${activeTab === "listing"
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
            : "grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto"
            }`}>
            {(activeTab === "listing" ? listingPlans : subscriptionPlans).map((plan) => (
              <PricingCard key={plan.id} plan={plan} isSubscription={activeTab === "subscription"} />
            ))}
          </div>

          {/* Billing Note */}
          <div className="text-center mt-8">
            <p className="text-sm text-slate-500">
              All prices in INR • Taxes extra as applicable • Billed monthly
            </p>
          </div>
        </div>
      </section>

      {/* Add-on Services Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold mb-4">
              <AiOutlineThunderbolt className="w-4 h-4" />
              Optional Add-ons
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Boost Your Success
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Power up your listings with premium services. Pay only for what you need.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {addonServices.map((addon) => (
              <AddonCard key={addon.id} addon={addon} />
            ))}
          </div>
        </div>
      </section>

      {/* Referral Program Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-semibold mb-4">
              <AiOutlineGift className="w-4 h-4" />
              Referral Program
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Refer & Earn Rewards
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              No need to list yourself! Share DealDirect with property owners and
              earn exciting rewards for every successful referral.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {referralTypes.map((referral, index) => (
              <ReferralCard key={index} referral={referral} />
            ))}
          </div>

          {/* CTA Banner */}
          <div className="mt-12 bg-gradient-to-r from-red-500 to-rose-600 rounded-3xl p-8 lg:p-12 text-center">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Start Referring Today!
            </h3>
            <p className="text-white/90 text-lg mb-6 max-w-xl mx-auto">
              Get your unique referral link and start earning. No minimum payouts,
              instant wallet credits.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-red-600 rounded-xl font-bold text-lg hover:bg-slate-50 transition-colors shadow-lg"
              >
                <AiOutlineGift className="w-5 h-5" />
                Get My Referral Link
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-colors border border-white/20"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ / Notes & CTA Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          {/* Combined Important Notes & CTA */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="grid lg:grid-cols-2">
              {/* Our Promise */}
              <div className="p-8 lg:p-10 bg-gradient-to-br from-slate-50 to-slate-100/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <AiOutlineCheck className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Our Promise</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <AiOutlineCheck className="w-3 h-3 text-emerald-600" />
                    </div>
                    <span className="text-slate-600 text-sm"><strong className="text-slate-900">No Hidden Charges</strong> — What you see is what you pay. Zero surprises.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <AiOutlineCheck className="w-3 h-3 text-emerald-600" />
                    </div>
                    <span className="text-slate-600 text-sm"><strong className="text-slate-900">Cancel Anytime</strong> — No lock-in contracts. Upgrade, downgrade, or cancel whenever you want.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <AiOutlineCheck className="w-3 h-3 text-emerald-600" />
                    </div>
                    <span className="text-slate-600 text-sm"><strong className="text-slate-900">Instant Activation</strong> — Your plan activates immediately after payment.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <AiOutlineCheck className="w-3 h-3 text-emerald-600" />
                    </div>
                    <span className="text-slate-600 text-sm"><strong className="text-slate-900">Secure Payments</strong> — All transactions protected with bank-grade encryption.</span>
                  </li>
                </ul>
              </div>

              {/* Have Questions CTA */}
              <div className="p-8 lg:p-10 flex flex-col justify-center bg-gradient-to-br from-red-500 to-rose-600">
                <div className="text-center lg:text-left">
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                    Have Questions?
                  </h3>
                  <p className="text-white/90 mb-8 text-lg">
                    Our team is here to help you choose the right plan for your needs.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-red-600 rounded-xl font-bold hover:bg-slate-50 transition-colors shadow-lg w-full sm:w-auto justify-center"
                    >
                      Talk to Us
                      <span>→</span>
                    </Link>
                    <Link
                      to="/why-us"
                      className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 backdrop-blur-sm text-white rounded-xl font-bold hover:bg-white/20 transition-colors border border-white/20 w-full sm:w-auto justify-center"
                    >
                      Why DealDirect?
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
