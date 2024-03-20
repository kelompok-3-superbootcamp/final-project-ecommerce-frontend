import Cards from "./card"

export default function Grid(){
    let cars = ["/brio.jpeg", "/fortuner.jpeg", "/omoda.jpeg", "/brio.jpeg","/xenia.jpeg","/sigra.jpeg"]
    let merk = 'Honda Brio 2024'
    let desc = 'Rp 334.800.000 - Rp 493.800.000'
    return (
        <>
        <div className="px-10 pt-10 text-4xl font-bold space-y-7">
            <h1>Mobil Terbaru</h1>
        </div>
        <div class="grid grid-cols-4 gap-4 p-10">
            {cars.slice(0,4).map((car, index) => (
                <Cards imageUrl={car} merk={merk} description={desc} key={index}></Cards>
            ))}
        </div>
        <div className="px-10 pt-10 text-4xl font-bold space-y-7">
            <h1>LCGC Bekas</h1>
        </div>
        <div class="grid grid-cols-4 gap-4 p-10">
            {cars.slice(4,6).map((car, index) => (
                <div key={index}>
                   <Cards imageUrl={car} merk={merk} description={desc} />
                </div>
            ))}
        </div>
        </>
    )
}