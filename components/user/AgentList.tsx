// components/AgentList.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const agents = [
  {
    name: "Tariro Moyo",
    role: "Senior Agent",
    location: "Harare",
    rating: "4.8",
  },
  {
    name: "Kuda Chikafu",
    role: "Property Consultant",
    location: "Bulawayo",
    rating: "4.6",
  },
  {
    name: "Nyasha Gumbo",
    role: "Client Advisor",
    location: "Bindura",
    rating: "4.9",
  },
  {
    name: "Tendai Mugabe",
    role: "Sales Executive",
    location: "Mutare",
    rating: "4.7",
  },
  {
    name: "Rudo Chirwa",
    role: "Leasing Specialist",
    location: "Gweru",
    rating: "4.5",
  },
];

export default function AgentList() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-primary">Meet Our Agents</h2>
        <p className="text-sm text-muted-foreground">
          Trusted professionals across Zimbabwe’s cities
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent, idx) => (
          <Card key={idx} className="bg-base-100 border border-base-300">
            <CardHeader>
              <h3 className="text-lg font-semibold text-primary">
                {agent.name}
              </h3>
              <p className="text-sm text-muted-foreground">{agent.role}</p>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>
                <span className="font-medium">Location:</span> {agent.location}
              </div>
              <div>
                <span className="font-medium">Rating:</span> {agent.rating} ⭐
              </div>
              <Button variant="outline" className="text-xs mt-2">
                Hire Agent
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
