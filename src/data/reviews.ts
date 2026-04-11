export interface Review {
  id: number;
  name: string;
  rating: number;
  content: string;
}

export const reviewsData: Review[] = [
  {
    id: 1,
    name: "Sarah Connors",
    rating: 4.9,
    content: "This book is a game-changer! Alwadiya's insights on managing properties and maximizing revenue are invaluable. I've implemented several strategies and already see improvements.",
  },
  {
    id: 2,
    name: "John Doe",
    rating: 4.2,
    content: "Mohanad Alwadiya provides a refreshing perspective on real estate management. The practical tips within are easy to digest and apply. Highly recommend for new and seasoned landlords alike!",
  },
  {
    id: 3,
    name: "Maria Lopez",
    rating: 4.4,
    content: "I was struggling with my rental properties until I read this book. The tips on tenant management alone are worth it!",
  },
  {
    id: 4,
    name: "Ahmed Al Farsi",
    rating: 5,
    content: "Clear, concise, and full of actionable advice. My rental business is thriving thanks to these strategies and insights.",
  },
  {
    id: 5,
    name: "Emily Zhang",
    rating: 4.5,
    content: "A comprehensive guide for both new and experienced landlords. I keep coming back to it for reference.",
  },
];