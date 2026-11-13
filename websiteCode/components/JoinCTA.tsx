import React from 'react';
import Button from './Button';

export default function JoinCTA() {
  return (
    <section className="relative isolate overflow-hidden rounded-3xl bg-hero-gradient px-6 py-14 text-center text-white shadow-lift sm:px-12">
      <div className="grid-bg absolute inset-0 -z-10 opacity-60" />
      <div className="absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-mint-500/20 blur-3xl" />
      <p className="eyebrow !text-mint-300 justify-center">Come build with us</p>
      <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-bold md:text-4xl">
        No experience needed. Just curiosity and a willingness to get your hands on the hardware.
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-forest-100">
        Mechanical, electrical and software teams all work on the same real project. Pick a lane, or try all three.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="https://groupme.com/join_group/110257950/WJX63DOF" target="_blank" size="lg">Join our GroupMe</Button>
        <Button href="/contact" variant="outline" size="lg">Ask us a question</Button>
      </div>
    </section>
  );
}
