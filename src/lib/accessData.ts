import { writable } from "svelte/store";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export interface Museum {
    id: number;
    title: string;
    state: string;
    location: string;
    address: string;
    subtitle: string;
    image: string;
    gallery: string[];
    description: string;
    price: number;
    rating: number;
    exhibitCount: string;
    contact: string;
    reviews: { name: string, rating: number, date: string, comment: string }[];
}

export const museums = writable<Museum[] | null>(null);

export async function fetchMuseums() {
    const querySnapshot = await getDocs(collection(db, "museums"));
    const museumList: Museum[] = [];

    querySnapshot.forEach((doc) => {
        museumList.push(doc.data() as Museum );
    });

    museums.set(museumList);
};

export const addMuseums = async () => {
    try {
      for (let i = 0; i < updateMuseum.length; i++) {
        const museum = updateMuseum[i];
        const museumRef = doc(db, "museums", (i + 1).toString());
        await setDoc(museumRef, museum);
      }
      console.log("Museums added successfully");
    } catch (error) {
      console.error("Error adding museums: ", error);
    }
};

const updateMuseum: Museum[] = [
    {
        "id": 1,
        "title": "Visakha Museum",
        "state": "Andhra Pradesh",
        "location": "Visakhapatnam",
        "address": "505, Beach Rd, Dutch Layout, Chinna Waltair, Pandurangapuram, Visakhapatnam, Andhra Pradesh 530017",
        "subtitle": "Museum displaying historic weapons, manuscripts & maritime items from Vizag.",
        "image": "https://travelsetu.com/apps/uploads/new_destinations_photos/destination/2023/12/29/47004a0df2fb75bbc76b94d6c14dc160_1000x1000.jpeg",
        "gallery": [
            "https://travelsetu.com/apps/uploads/new_destinations_photos/destination/2023/12/29/47004a0df2fb75bbc76b94d6c14dc160_1000x1000.jpeg",
            "https://s7ap1.scene7.com/is/image/incredibleindia/visakha-museum-visakhapatnam-andhra-pradesh-attr-about?qlt=82&ts=1726744407382",
            "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/0f/8a/0d/caption.jpg?w=900&h=500&s=1"
        ],
        "description": "The Visakha Museum, located in the coastal city of Visakhapatnam, showcases a remarkable collection of artifacts related to the region's rich maritime and military history. The museum houses an extensive display of ancient manuscripts, weaponry, historical documents, and various exhibits depicting the cultural heritage of Andhra Pradesh. Visitors can explore relics from the colonial era, old coins, and models of warships that played a crucial role in naval battles. The museum also highlights the impact of the Eastern Naval Command, providing a deeper understanding of the strategic importance of Vizag as a port city. It is a must-visit destination for history enthusiasts and those curious about India's naval legacy.",
        "price": 120,
        "rating": 4.3,
        "exhibitCount": "500+",
        "contact": "vizagtourism.org.in | 022 1245 6854",
        "reviews": [
            { "name": "Suresh Babu", "rating": 4, "date": "February 10, 2025", "comment": "A great place to learn about Vizag's maritime history. The ship models and naval artifacts were fascinating." },
            { "name": "Anjali Rao", "rating": 5, "date": "January 25, 2025", "comment": "Impressive collection of historic weapons and manuscripts. The museum is well-maintained and informative." },
            { "name": "Michael Fernandes", "rating": 4, "date": "January 5, 2025", "comment": "The museum has a decent collection of war relics, though some sections could use better lighting." },
            { "name": "Ravi Teja", "rating": 4, "date": "December 20, 2024", "comment": "A must-visit for history buffs! The maritime section was the highlight for me." }
        ]
    },    
    {
        "id": 2,
        "title": "Jawaharlal Nehru Museum",
        "state": "Arunachal Pradesh",
        "location": "Itanagar",
        "address": "4J2G+R22, Itanagar, Arunachal Pradesh 791111",
        "subtitle": "Museum showcasing tribal artifacts and heritage of Arunachal Pradesh.",
        "image": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/b3/8b/8e/main-building.jpg?w=1200&h=-1&s=1",
        "gallery": [
            "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/b3/8b/8e/main-building.jpg?w=1200&h=-1&s=1",
            "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgsuUYEbYrVgIM3bcgJFym0jqv78XHcgLCyMIflm0fiaod9PrZXeT1g5nzXeJ8hhYD_n8Uqw7DI8gywvcRB0m11D-qt4AF0_sHDuRLiiVnzKPW8ymfPg2V0dIf9W5pn5ZSwFEt9Nz6yNhCC/s1600/942831-mlzinngxjm-1537720795.jpg",
            "https://shop.museumsofindia.org/sites/default/files/2017-11/Court-Proceeding-under-Nehru.jpg"
        ],
        "description": "The Jawaharlal Nehru Museum in Itanagar is a cultural treasure trove, offering visitors a glimpse into the vibrant tribal heritage of Arunachal Pradesh. This museum features an extensive collection of traditional costumes, ancient weapons, handicrafts, and rare artifacts that highlight the customs and traditions of the indigenous tribes of the region. Visitors can explore exhibits on traditional weaving techniques, bamboo and cane crafts, and historical relics that narrate the evolution of Arunachal's diverse communities. The museum also hosts interactive sessions and cultural workshops to promote local art forms, making it an insightful destination for history enthusiasts and cultural explorers.",
        "price": 110,
        "rating": 4.4,
        "exhibitCount": "300+",
        "contact": "arunachaltourism.org.in | 022 4587 2569",
        "reviews": [
            { "name": "Tenzing Dorjee", "rating": 5, "date": "February 18, 2025", "comment": "A wonderful place to learn about Arunachal’s rich tribal culture. The textile section was especially captivating." },
            { "name": "Meera Sharma", "rating": 4, "date": "January 30, 2025", "comment": "A well-organized museum with detailed exhibits. Could use more interactive displays, but overall a great experience!" },
            { "name": "John Matthew", "rating": 5, "date": "January 12, 2025", "comment": "Loved the variety of tribal artifacts on display. A must-visit for culture and history enthusiasts!" },
            { "name": "Anupam Das", "rating": 4, "date": "December 22, 2024", "comment": "Very informative and well-maintained. The weapons exhibit was particularly interesting." }
        ]
    },
    {
        "id": 3,
        "title": "Assam State Museum",
        "state": "Assam",
        "location": "Guwahati",
        "address": "GNB Rd, near Dighalipukhuri, Mawhati, Ambari, Guwahati, Assam 781001",
        "subtitle": "Museum showcasing Assam's heritage through sculptures and ancient artifacts.",
        "image": "https://cdn.tripuntold.com/media/photos/location/2018/11/28/d2dcf8b6-d35d-4c7a-82da-a7be41938f0e.jpg",
        "gallery": [
            "https://cdn.tripuntold.com/media/photos/location/2018/11/28/d2dcf8b6-d35d-4c7a-82da-a7be41938f0e.jpg",
            "https://www.trawell.in/admin/images/upload/470029347Guwahati_Assam_State_Museum_Main.jpg",
            "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhZuvv2KekT8_BX8RKx6UqWEVJBkKIwy1_SSMDxpiIeEqO_lhnPuvUb2Ut0LHrGGis1jfZ9qZVWxvJ6pFztaTSj6-20iuWDWRa0jAVBYuWiNYF3EDGQG-uKKfFI86W_-0NgpjvEtfsDEKo2/s1600/11DSC_0285.jpg"
        ],
        "description": "The Assam State Museum, located in the heart of Guwahati, is a premier institution preserving and showcasing the rich cultural and historical heritage of Assam. Established in 1940, the museum houses an extensive collection of ancient sculptures, manuscripts, numismatic treasures, and ethnographic artifacts. Visitors can explore exhibits displaying Assamese traditional attire, weaponry, and centuries-old inscriptions that narrate the history of the region. The museum also features a dedicated section for archaeological findings, including rare terracotta pieces and stone carvings from various dynasties. With its diverse collections and educational exhibits, the museum serves as a gateway to Assam’s glorious past.",
        "price": 120,
        "rating": 4.5,
        "exhibitCount": "1000+",
        "contact": "museums.assam.gov.in | 022 5795 4744",
        "reviews": [
            { "name": "Rohit Das", "rating": 5, "date": "February 20, 2025", "comment": "A treasure trove of Assamese heritage! The ancient sculptures and manuscripts were truly mesmerizing." },
            { "name": "Priya Sen", "rating": 4, "date": "January 18, 2025", "comment": "Informative and well-maintained museum. The numismatic section was particularly interesting." },
            { "name": "Aditya Mahanta", "rating": 5, "date": "December 30, 2024", "comment": "Loved the variety of exhibits, especially the ethnographic section. A must-visit for history lovers." }
        ]
    },    
    {
        "id": 4,
        "title": "Bihar Museum",
        "state": "Bihar",
        "location": "Patna",
        "address": "Jawaharlal Nehru Marg, Bailey Rd, Patna, Bihar 800001",
        "subtitle": "Modern museum displaying Bihar's history through galleries and cultural artifacts.",
        "image": "https://s7ap1.scene7.com/is/image/incredibleindia/bihar-museum-patna-bihar-1-musthead-hero?qlt=82&ts=1726740176622",
        "gallery": [
            "https://s7ap1.scene7.com/is/image/incredibleindia/bihar-museum-patna-bihar-1-musthead-hero?qlt=82&ts=1726740176622",
            "https://www.platform-mag.com/uploads_platform/article-heroimg/C1100-the-bihar-museum-biennale-2703.jpg",
            "https://indiaartfair.in/app/uploads/2023/07/Bihar-Museum-General-Display.jpg"
        ],
        "description": "The Bihar Museum, located in Patna, is a contemporary cultural institution dedicated to showcasing the rich history and heritage of Bihar. Opened in 2015, the museum boasts state-of-the-art galleries displaying ancient artifacts, sculptures, manuscripts, and cultural relics from various historical periods. The museum is particularly renowned for its collection of Mauryan-era artifacts, including the famous Didarganj Yakshi sculpture. It also features an interactive children's gallery, a section on tribal culture, and exhibits highlighting Bihar’s contributions to art, politics, and spirituality. With its blend of modern architecture and historical treasures, the museum offers a unique learning experience for visitors of all ages.",
        "price": 100,
        "rating": 4.7,
        "exhibitCount": "5000+",
        "contact": "biharmuseum.org.in | 022 6485 1475",
        "reviews": [
            { "name": "Amit Sinha", "rating": 5, "date": "February 22, 2025", "comment": "A stunning museum with a modern touch! The Didarganj Yakshi sculpture was mesmerizing." },
            { "name": "Neha Prasad", "rating": 4, "date": "January 25, 2025", "comment": "A well-designed museum with informative exhibits. The tribal heritage section was fascinating." },
            { "name": "Rakesh Kumar", "rating": 5, "date": "December 18, 2024", "comment": "Loved the children’s gallery! A great place for families and history enthusiasts alike." },
            { "name": "Meera Sharma", "rating": 4, "date": "November 30, 2024", "comment": "A well-maintained museum with excellent audio tours. Highly recommended!" },
            { "name": "Vikram Singh", "rating": 5, "date": "November 10, 2024", "comment": "The architecture is amazing, and the collection is outstanding. A must-visit in Patna!" }
        ]
    },    
    {
        "id": 5,
        "title": "Mahant Ghasidas Memorial",
        "state": "Chhattisgarh",
        "location": "Raipur",
        "address": "6JVV+HX3 Ghadi Chowk, Raj Bhawan Rd, Civil Lines, Raipur, Chhattisgarh 492001",
        "subtitle": "Museum with ancient coins, sculptures & tribal artifacts from Chhattisgarh's heritage.",
        "image": "https://s7ap1.scene7.com/is/image/incredibleindia/bihar-museum-patna-bihar-1-musthead-hero?qlt=82&ts=1726740176622",
        "gallery": [
            "https://s7ap1.scene7.com/is/image/incredibleindia/bihar-museum-patna-bihar-1-musthead-hero?qlt=82&ts=1726740176622",
            "https://s7ap1.scene7.com/is/image/incredibleindia/mahant-ghasi-memorial-museum-raipur-chhattisgarh-1-attr-hero?qlt=82&ts=1727011191956",
            "https://s7ap1.scene7.com/is/image/incredibleindia/mahant-ghasi-memorial-museum-raipur-chhattisgarh-2-attr-hero?qlt=82&ts=1727011287840"
        ],
        "description": "The Mahant Ghasidas Memorial Museum in Raipur is a historical and cultural treasure trove showcasing the rich heritage of Chhattisgarh. Established in 1875 and later renovated, the museum houses an extensive collection of ancient coins, sculptures, tribal artifacts, and inscriptions. Visitors can explore exhibits featuring the artistic excellence of the region, including terracotta figurines, antique weaponry, and manuscripts that provide a glimpse into Chhattisgarh’s past. The museum also boasts an impressive tribal section, displaying traditional costumes, jewelry, and cultural artifacts from indigenous communities. It serves as an important center for learning and preservation of the state’s vibrant history.",
        "price": 110,
        "rating": 4.6,
        "exhibitCount": "2000+",
        "contact": "chhattisgarhtourism.org.in | 022 4589 3675",
        "reviews": [
            { "name": "Aarav Patel", "rating": 5, "date": "February 28, 2025", "comment": "An excellent museum that beautifully presents Chhattisgarh's cultural heritage. Loved the tribal section!" },
            { "name": "Suman Verma", "rating": 4, "date": "January 20, 2025", "comment": "A well-organized collection of artifacts. The ancient coins display was particularly impressive." },
            { "name": "Rohan Deshmukh", "rating": 5, "date": "December 15, 2024", "comment": "A must-visit for history enthusiasts. The sculpture collection was stunning!" },
            { "name": "Kavita Sharma", "rating": 4, "date": "November 22, 2024", "comment": "Very informative museum with a great audio guide. Accessibility features were well thought out." }
        ]
    }                
];