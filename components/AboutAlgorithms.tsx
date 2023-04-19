import DFS from "./algorithms/DFS"

const AboutAlgorithms = () => {
    const algorithmDescriptions = {
        dijkstra:{
            eli5: "Dijkstra's algorithm is a graph traversal algorithm that finds the shortest path between two nodes in a graph. It is a weighted algorithm, meaning that it takes into account the weight of each edge in the graph. It is a greedy algorithm, meaning that it makes the best choice at each step. It is a single-source algorithm, meaning that it finds the shortest path from a single node to all other nodes in the graph.",
            wiki: "https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm",
            implementationComponent: DFS
        }        
        
    }

    const algorithmsArray = Object.keys(algorithmDescriptions).map((algorithm) => {
        return {
            title: algorithm,
            ...(algorithmDescriptions as any)[algorithm] 
        }
    })



    return (
        <div>
            {algorithmsArray.map((algorithm, index) => {
                return (
                        <div key={index}>
                            <a>{algorithm.title}</a>
                            {algorithm.implementationComponent()}
                        </div>
                        
                    )
            })}
        </div>
    )
}

export default AboutAlgorithms
