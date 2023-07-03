import Image from 'next/image'
import ExperienceCanvas from "@/components/Experience";
import StarsCanvas from "@/components/Stars";

export default function Home() {
    return (
        <main className="h-full w-full">
            <ExperienceCanvas/>
        </main>
    )
}
