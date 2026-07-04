import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const GiftCardFAQ = () => {
  const [faqOpen, setFaqOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-sans text-left bg-white mt-8 mb-4">
      {/* FAQ Accordion Row */}
      <div className="border-t border-gray-200">
        <button
          onClick={() => setFaqOpen(!faqOpen)}
          className="w-full py-5 flex justify-between items-center text-[#191919] hover:text-ebay-blue transition focus:outline-none cursor-pointer"
        >
          <span className="text-lg font-bold">FAQ</span>
          {faqOpen ? (
            <Minus size={20} className="text-gray-600" />
          ) : (
            <Plus size={20} className="text-gray-600" />
          )}
        </button>

        {faqOpen && (
          <div className="pb-6 space-y-6 text-xs text-gray-700 leading-relaxed max-w-4xl animate-fadeIn">
            {/* Q1 */}
            <div>
              <h4 className="font-bold text-[#191919] text-[13px] mb-1.5">What can gift cards be used for?</h4>
              <p className="text-gray-600 font-medium">
                eBay gift cards can be used to buy almost anything on eBay.com. They may not be used to buy other eBay gift cards, third party gift cards, gift certificates, coupons, coins, paper money, virtual currency, or items generally considered to be "bullion" (for example, gold, silver, and other precious metals in the form of coins, bars, or ingots). Not refundable or redeemable for cash unless required by law. Items purchased with eBay Gift Cards must be shipped to the U.S. Full terms and conditions apply.
              </p>
            </div>

            {/* Q2 */}
            <div>
              <h4 className="font-bold text-[#191919] text-[13px] mb-1.5">Do I need an eBay account to use an eBay gift card?</h4>
              <p className="text-gray-600 font-medium">
                You need an eBay account registered in the U.S. and a U.S. shipping address to use an eBay gift card. You can create an eBay account at any time.
              </p>
            </div>

            {/* Q3 */}
            <div>
              <h4 className="font-bold text-[#191919] text-[13px] mb-1.5">Does my gift card expire?</h4>
              <p className="text-gray-600 font-medium">
                Your eBay gift card does not expire and there are no fees.
              </p>
            </div>

            {/* Q4 */}
            <div>
              <h4 className="font-bold text-[#191919] text-[13px] mb-1.5">What if my order total is less than the amount of my eBay gift card?</h4>
              <p className="text-gray-600 font-medium">
                After using your eBay gift card, any remaining balance is attached to your eBay account. To redeem the remaining balance, select your gift card from Gift cards and coupons at checkout.
              </p>
            </div>

            {/* Q5 */}
            <div>
              <h4 className="font-bold text-[#191919] text-[13px] mb-1.5">Where can I get help if I'm having trouble redeeming my eBay gift card at checkout?</h4>
              <p className="text-gray-600 font-medium">
                If you are having trouble with your eBay gift card, review these <span className="text-ebay-link hover:underline cursor-pointer">troubleshooting steps</span> or <span className="text-ebay-link hover:underline cursor-pointer">contact us</span>.
              </p>
            </div>

            <div className="border-t border-gray-100 pt-4 text-xs font-semibold">
              <span>Need more help? Visit </span>
              <span className="text-ebay-link hover:underline cursor-pointer">eBay Gift Cards FAQs</span>
            </div>
          </div>
        )}
      </div>

      {/* Terms & Conditions Accordion Row */}
      <div className="border-t border-gray-200 border-b">
        <button
          onClick={() => setTermsOpen(!termsOpen)}
          className="w-full py-5 flex justify-between items-center text-[#191919] hover:text-ebay-blue transition focus:outline-none cursor-pointer"
        >
          <span className="text-lg font-bold">Terms & Conditions</span>
          {termsOpen ? (
            <Minus size={20} className="text-gray-600" />
          ) : (
            <Plus size={20} className="text-gray-600" />
          )}
        </button>

        {termsOpen && (
          <div className="pb-6 text-xs text-gray-700 animate-fadeIn font-semibold">
            <span>Read the eBay </span>
            <span className="text-ebay-link hover:underline cursor-pointer">Gift Cards Terms and Conditions</span>
          </div>
        )}
      </div>

      {/* Scam Protection Info Block (Always visible below accordions) */}
      <div className="mt-8 space-y-3 max-w-4xl text-xs">
        <h3 className="text-[#191919] font-bold text-base">How can I protect myself from gift card scams and fraud?</h3>
        <p className="text-gray-700 font-semibold">To make sure your eBay Gift Card codes are safe from scammers, follow these tips:</p>
        <ul className="list-disc pl-5 space-y-1.5 text-gray-600 font-semibold">
          <li>Your eBay Gift Card can only be redeemed at checkout on ebay.com.</li>
          <li>Never give or send your eBay Gift Card code to anyone outside of ebay.com checkout. That's a scam.</li>
          <li>Do not use your Gift Card to pay anyone outside of the eBay platform.</li>
          <li>
            If you think you've been targeted by a Gift Card scam, <span className="text-ebay-link hover:underline cursor-pointer font-bold">Contact eBay Customer Service</span> immediately.
          </li>
        </ul>
        <div className="pt-2 font-bold">
          <span className="text-[#191919] hover:underline cursor-pointer border-b border-black pb-0.5">Learn more about Gift Card Scams.</span>
        </div>
      </div>
    </div>
  );
};

export default GiftCardFAQ;
