import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Full screen, minimal */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(47, 62, 46, 0.05) 35px, rgba(47, 62, 46, 0.05) 70px)`
          }} />
        </div>

        <div className="text-center z-10 px-6 fade-in">
          <p className="text-[#C9A961] uppercase tracking-[0.3em] text-xs mb-8">Premium Golf Gifts</p>
          <div className="mb-6">
            <Image 
              src="/custom-caddie-logo.png" 
              alt="Custom Caddie" 
              width={320} 
              height={120} 
              className="object-contain mx-auto"
            />
          </div>
          <p className="text-lg text-[#7C8471] max-w-md mx-auto mb-12">
            Thoughtfully crafted golf accessories, personalized for the distinguished player.
          </p>
          <Link href="/customize" className="btn-primary inline-flex items-center gap-3 group">
            Begin Customization
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#C9A961]/50 to-transparent animate-pulse" />
        </div>
      </section>

      {/* Sets Preview - Minimalist grid */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-serif mb-4">Select Your Collection</h2>
            <p className="text-[#7C8471]">Each set meticulously curated for the modern golfer</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Executive Set */}
            <Link href="/customize?set=executive" className="group">
              <div className="aspect-[3/4] bg-[#E8DCC4]/20 mb-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#2F3E2E]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-6 left-6 right-6 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <p className="uppercase tracking-wider text-xs mb-2">Starting at</p>
                  <p className="text-2xl">$149</p>
                </div>
              </div>
              <h3 className="text-2xl font-serif mb-2">The Executive</h3>
              <p className="text-[#7C8471] text-sm">Essential elegance for the corporate course</p>
            </Link>

            {/* Signature Set */}
            <Link href="/customize?set=signature" className="group">
              <div className="aspect-[3/4] bg-[#E8DCC4]/20 mb-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#2F3E2E]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-6 right-6 bg-[#C9A961] text-white px-3 py-1 text-xs uppercase tracking-wider">
                  Most Popular
                </div>
                <div className="absolute bottom-6 left-6 right-6 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <p className="uppercase tracking-wider text-xs mb-2">Starting at</p>
                  <p className="text-2xl">$249</p>
                </div>
              </div>
              <h3 className="text-2xl font-serif mb-2">The Signature</h3>
              <p className="text-[#7C8471] text-sm">Complete collection for the avid player</p>
            </Link>

            {/* Custom Set */}
            <Link href="/customize?set=custom" className="group">
              <div className="aspect-[3/4] bg-[#E8DCC4]/20 mb-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#2F3E2E]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-6 left-6 right-6 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <p className="uppercase tracking-wider text-xs mb-2">Starting at</p>
                  <p className="text-2xl">$399</p>
                </div>
              </div>
              <h3 className="text-2xl font-serif mb-2">Bespoke</h3>
              <p className="text-[#7C8471] text-sm">Tailored to your exact specifications</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 bg-white/50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-serif mb-4">Simple Elegance</h2>
            <p className="text-[#7C8471]">Three steps to your perfect gift</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-5xl font-serif text-[#C9A961] mb-4">01</div>
              <h3 className="text-xl mb-2">Select</h3>
              <p className="text-[#7C8471] text-sm">Choose your preferred collection</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-serif text-[#C9A961] mb-4">02</div>
              <h3 className="text-xl mb-2">Personalize</h3>
              <p className="text-[#7C8471] text-sm">Add name and select finish</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-serif text-[#C9A961] mb-4">03</div>
              <h3 className="text-xl mb-2">Receive</h3>
              <p className="text-[#7C8471] text-sm">Delivered in premium packaging</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-32">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="mb-8">
            <div className="flex justify-center gap-1 mb-8">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-4 h-4 bg-[#C9A961]" />
              ))}
            </div>
            <blockquote className="text-2xl md:text-3xl font-serif italic mb-6">
              "The attention to detail is extraordinary. This is how golf gifts should be done."
            </blockquote>
            <cite className="text-[#7C8471] not-italic">
              — James Morrison, CEO
            </cite>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-[#2F3E2E] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-serif mb-6">Ready to Begin?</h2>
          <p className="text-lg opacity-80 mb-12">
            Create a lasting impression with personalized golf accessories
          </p>
          <Link href="/customize" className="bg-[#C9A961] hover:bg-[#B39651] text-[#2F3E2E] px-8 py-4 inline-flex items-center gap-3 transition-all duration-300 uppercase tracking-wider text-sm font-medium group">
            Start Customizing
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-[#E8DCC4]/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Image 
              src="/custom-caddie-logo.png" 
              alt="Custom Caddie" 
              width={150} 
              height={50} 
              className="object-contain"
            />
            <div className="text-sm text-[#7C8471]">
              © 2024 Custom Caddie. Premium Golf Gifts.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}