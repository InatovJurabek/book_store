class BookAPI {
    static async getFeaturedBooks() {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        return [
            {
                id: 1,
                title: "The Midnight Library",
                author: "Matt Haig",
                price: 24.99,
                coverColor: "linear-gradient(45deg, #6C63FF, #8B85FF)",
                rating: 4.5
            },
            {
                id: 2,
                title: "Atomic Habits",
                author: "James Clear",
                price: 27.99,
                coverColor: "linear-gradient(45deg, #FFC300, #FFD54F)",
                rating: 4.8
            },
            {
                id: 3,
                title: "The Alchemist",
                author: "Paulo Coelho",
                price: 19.99,
                coverColor: "linear-gradient(45deg, #FF6B6B, #FF8E8E)",
                rating: 4.7
            },
            {
                id: 4,
                title: "Dune",
                author: "Frank Herbert",
                price: 29.99,
                coverColor: "linear-gradient(45deg, #4ECDC4, #88D9D3)",
                rating: 4.6
            },
            {
                id: 5,
                title: "Project Hail Mary",
                author: "Andy Weir",
                price: 26.99,
                coverColor: "linear-gradient(45deg, #FF8E53, #FFA477)",
                rating: 4.9
            },
            {
                id: 6,
                title: "The Silent Patient",
                author: "Alex Michaelides",
                price: 22.99,
                coverColor: "linear-gradient(45deg, #9B59B6, #BD69DE)",
                rating: 4.4
            },
            {
                id: 7,
                title: "Educated",
                author: "Tara Westover",
                price: 21.99,
                coverColor: "linear-gradient(45deg, #3498DB, #5DADE2)",
                rating: 4.7
            },
            {
                id: 8,
                title: "Where the Crawdads Sing",
                author: "Delia Owens",
                price: 25.99,
                coverColor: "linear-gradient(45deg, #E74C3C, #EC7063)",
                rating: 4.8
            }
        ];
    }
}


export default BookAPI;