import Layout from "@/components/Layout";
import styles from "@/styles/Leaves.module.scss";

export default function Home() {
  return (
    <>
      <Layout>
        <div className={styles.container}>
        <div className={styles.quote}>
          at the center of every labyrinth lies a Minotaur
        </div>
        <div className={styles.textquote}>
          It would be fantastic if based on footage from The Navidson Record
          someone were able to reconstruct a bauplan for the <a className={styles.house} 
          href="https://en.wikipedia.org/wiki/House_of_Leaves" 
            target="_blank"
          >house</a>. Of course
          this is an impossibility, not only due to the wall-shifts but also the
          film&apos;s constant destruction of continuity, frequent jump cuts
          prohibiting any sort of accurate mapmaking. Consequently, in lieu of a
          schematic, the film offers instead a schismatic rendering of empty
          rooms, long hallways, and dead ends, perpetually promising but forever
          eluding the finality of an immutable layout. Curiously enough, if we
          can look to history to provide us with some context, the reasons for
          building labyrinths have varied substantially over the ages.<sup>122</sup> For
          example, the English hedgerow maze at Longleat was designed to amuse
          garden party attendants, while Amenemhet III of the XII dynasty in
          Egypt built for his mortuary temple a labyrinth near lake Moeris to
          protect his soul. 
          <span className={styles.zampano}>
            Most famous of all, however, was the labyrinth Daedalus constructed
            for King Minos. It served as a prison. Purportedly located on the
            island of Crete in the city of Knossos, the maze was built to
            incarcerate the Minotaur, a creature born from an illicit encounter
            between the queen and a bull. As most school children learn, this
            monster devoured more than a dozen Athenian youths every few years
            before Theseus eventu ally slew it.
            <br/>
            <br/>
            
            While the Minotaur has often been
            depicted as a creature with the body of a bull but the torso of a
            man centaur like the myth describes the Minotaur as simply having
            the head of a bull and the body of a man, or in other words, a man
            with a deformed face. I believe pride would not allow Mines to
            accept that the heir to the throne had a horrendous-appearance
            Having enough conscience to keep from murdering his own flesh and
            blood, Minos had a labyrinth constructed, complicated enough to keep
            his son from ever escaping but without bars to suggest a prison. (It
            is interesting to note how the myth states most of the Athenian
            youth &quot;fed&quot; to the Minotaur actually starved to death in the
            labyrinth thus indicating their deaths had more to do with the
            complexity of the maze and less to do with the presumed fereeity of
            the Minotaur) At the heart of the labyrinth waits the Min[ ]taur and
            like the Minotaur of myth its name is [  ] Chiclitz treated the maze
            a s trope for psychic concealmente, its excavation resulting in
            (tragic [] reconciliation But if in Chiclitz&apos;s eye the Minotaur
            was a son imprisoned by a father&apos;s shame, is there thento Navidson&apos;s
            eye an equivalent misprison of the [  ] in the depth of that place?
            And for that matter does there exist a chance to reconcile the not
            known with the desire for its antithesis? Navison is not Minos. He
            did not build the lab yrinth. He only d[ ]covered it.
          </span>
        </div>
        </div>
      </Layout>
    </>
  );
}
