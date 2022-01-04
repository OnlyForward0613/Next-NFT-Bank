import { useState } from 'react'
import { Container, Collapse } from '@mui/material'
import Head from 'next/head'
import FAQItem from '../components/FAQItem'
import Sidebar from '../components/Sidebar'

export default function FAQ({ connected, ...props }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Sidebar
        connected={connected}
      />
      <div id="faq" className="faq page-content">
        <Head>
          <title>NFT Bank | Frequently answered questions</title>
          <meta name="description" content="Frequently answered questions" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Container>
          <div className="section-title">
            <h1>Frequently asked questions</h1>
            <p>If the answer to your question isn&apos;t here then ask it on <a href="https://twitter.com/DustyVaultsNFT" target="_blank" rel="noreferrer">Twitter</a>, we&apos;ll answer it and add it.</p>
            <p>Store your NFT&apos;s in our vaults and they will get $Dusty</p>
          </div>
          <div className="faq-content">


            <div className="faq-item">
              <div className="faq-question" onClick={() => setOpen(!open)}>
                {!open ?
                  <svg width="12" height="12" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 10C20 9.66667 19.8 9 19 9H11V1C11 0.5 10.5 0 10 0C9.5 0 9 0.5 9 1V9H1C0.5 9 0 9.5 0 10C0 10.5 0.5 11 1 11H9V19C9 19.5 9.5 20 10 20C10.5 20 11 19.5 11 19V11H19C19.8 11 20 10.3333 20 10Z" fill="white" />
                  </svg>
                  :
                  <svg width="12" height="2" viewBox="0 0 20 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="20" width="2" height="20" rx="1" transform="rotate(90 20 0)" fill="white" />
                  </svg>
                }
                <p>Who am I?</p>
              </div>
              <div className="faq-answer">
                <Collapse in={open}>
                  <p>
                    Very existential! You have bought a bunch of pretty pictures (NFT&apos;s) because&nbsp;<span>you read a tweet from a stranger telling you they would go to the moon</span>&nbsp;you have done extensive due diligence and believe in the artistic integrity and the long term viability of the project. However, currently the rest of the world hasn&apos;t caught up and the values are languishing. You have decided to put them in storage and earn some money off them in the meantime.
                  </p>
                </Collapse>
              </div>
            </div>
            {questions.map((item, key) => (
              <FAQItem
                question={item.question}
                answer={item.answer}
                key={key}
              />
            ))
            }

          </div>
          <div className="partnership">
            <p>For partnerships please email </p>
            <a href="mailto:dustyvaults@gmail.com">
              dustyvaults@gmail.com
            </a>
          </div>
        </Container>
      </div>
    </>
  )
}

const questions = [
  {
    question: "How does it work?",
    answer: "We are a safe, boring NFT vault.  That is very $Dusty.  You can pay us to store your NFT’s for the next year.  We’re going to lock them in an old vault and keep a watchful eye on them.  Like anything put in storage it will get $Dusty over time.  In fact at the end of 12 months you can withdraw your NFT, plus your original funds, plus all your accumulated $Dusty tokens. @@1 - Connect your wallet@@2 - Ensure you’re on the right network@@3 - Make sure you have some $Dusty tokens in your wallet@@4 - Select the NFT’s in your wallet that you want to store@@5 - Select how much you want to pay / receive (the more you pay for storage, the more $Dusty you receive)@@6 - Set & forget.  They’re in storage now, leave them alone and come back in a year.@@"
  },
  {
    question: "How much will I make?",
    answer: "Up to you, the more you spend on storage the more $Dusty tokens you will receive in 12 months time.  The least is 10%, the maximum is 50% but the price of $Dusty will also impact your earnings."
  },
  {
    question: "I can get higher APR’s elsewhere!",
    answer: "Yes.  Yes, you can.  Off you go.@@At a certain point in every art collectors life you realise 2 things:@@1.	Your art/NFT is worthless as long as it’s sitting in your wallet doing nothing@@2.	Trying to find the best returns in crypto is like playing whack a mole but with less satisfaction and more rugs.  Sometimes it’s nice just to put an asset to work and forget about it for a year."
  },
  {
    question: "Can I withdraw my NFT within the 12 months?",
    answer: "You can, but we don’t like it.  It involves effort on our part and messes with our algorithms, so you will lose 100% of the fees you paid and any earned $Dusty tokens.  However, we recognise the value of your NFT’s might well increase significantly over the course of the year and you may decide it is well worth it.  Your call.  If you’re happy with those terms just select your stored NFT’s and click ‘Dust ‘em off and remove from storage’."
  },
  {
    question: "What happens to my fees if I withdraw?",
    answer: "Fortunately for you, we are civic minded.  50% of your fees will go to a bonus wallet to reward diamond hands.  The other 50% will be moved to a charity wallet.  Over the next 30 days your tokens will be liquidated and donated to causes where 100% of the funds are put to use (no ‘admin’ fees).  Results will be updated monthly on our page."
  },
  {
    question: "What happens at the end of 12 months?",
    answer: "You decide.  When you place your NFT’s in storage you can pick an option:@@- The contract just rolls on accruing $Dusty on a daily basis until you choose to withdraw (no penalty, you get to keep all the $Dustry accumulated to this point@@- We automatically send the NFT + $Dusty back to their wallets, airdrop style"
  },
  {
    question: "Why don’t you have a Telegram or Discord group?",
    answer: "Honestly, this is the most boring NFT/Defi project you will ever be a part of.  You store your NFT’s in a vault and then you forget about it for a year.  What’s to talk about?  At the end of the year you either re-stake or withdraw.  That’s it.  There are no other options. If you want drama, rumours, gossip, scandal and to drive yourself nuts because an anonymous account tried to fud a project, go elsewhere.  We are safe, calm and dull (and dusty!).  All communications will come from our official Twitter account (https://twitter.com/DustyVaultsNFT).  Everything else can be ignored."
  },
  {
    question: "But, but, but, on Discord someone said that if the blockchain gets $Dusty my NFT will get creased (or insert other unsubstantiated rumour…)",
    answer: "Deep breaths.  You do not have to believe everything you read on the Internet.  And we will not address every crazy rumour because, well, we’re grown ups."
  },
  {
    question: "I joined your Telegram & Discord group anyway.",
    answer: "See above. It has nothing to do with us. it is unsanctioned, unlicensed and uninteresting to us.  Join at your peril. @@ Follow us on Twitter if you must, but we’re a boring, dusty vault, you’re not going to learn anything earth shattering."
  },
  {
    question: "A friendly admin is asking for my seed phrase.",
    answer: "Please don’t.  Never ever."
  },
  {
    question: "Will you be doing airdops?",
    answer: "It is possible you will one day wake up and find your wallet is extra $Dusty… Those that restake their NFT’s for a second year are likely to receive the most."
  },
  {
    question: "Should I speculate on the $Dusty Token?",
    answer: "Are you seeking financial advice from a dusty vault FAQ?  That would be a bit silly.@@Here are the tokenomics, make your own decisions@@ @@There are 10m $Dusty Tokens.@@3m are reserved for the team that built and maintained this and a couple of early investors. They are locked up for 12 months from launch and then can only sell a maximum of 10% of daily volume each day after that.@@3m are unlocked in Treasury@@3m is the reward pool.  This is the sweet, sweet $Dusty that rains down upon your stored NFT’s.@@1m is for marketing.@@  @@ Some of this treasury will be used to provide liquidity for Dex’s and to support the Token.@@For the first 12 months there will be only buy side and liquidity provided by the Treasury and some mercenary marketeers.  Speculators may try to manipulate the price, but the majority of tokens will either be in Treasury or locked up in storage for the first 12 months.@@However, the real buy side will begin in the second 12 months, when our more cautious clients are reassured that original clients have been able to extract their NFT’s, their initial stake and their pile of $Dust.  This new buy side will significantly increase the liquidity in the project."
  },
  {
    question: "What do you do with the funds?",
    answer: "The first responsibility of the treasury is to build the treasury funds so that if necessary we can buy back our $Dusty on the open market, providing a floor in the price and making sure our clients funds are not diluted.  Everything after that is just building value.@@Our Treasurer does this full time.  Whilst she isn’t going to share her secret sauce the Treasury funds are split between bluechips, stablecoin plays (with and without leverage), the more interesting Defi projects and about 10% goes into speculative punts.  With direct access into several launchpads she can get into many new projects before others even hear about them.  Can’t tell you any more but you would be green (candlesticks) with envy."
  },
  {
    question: "Are you audited?",
    answer: "In all seriousness the safety of your NFT’s and your funds is #1, 2 & 3 priority for this team.  It’s not marketing, it’s not scaling, it’s security.  We don’t need new users to make this work, but we do need a watertight storage unit and that will come with audits. They take time, but they will happen.  Guaranteed."
  },
  {
    question: "What blockchains are you on?",
    answer: "We’re starting life on Binance (BSC). Other chains will be added soon."
  },
  {
    question: "Who is behind this project?",
    answer: "The team behind this are successful in their own right in other projects and don’t want this project to detract from their day jobs.  It’s also a pretty simple, and very boring, project. We don’t have a convoluted road map, we’re not going to gamify this, there are no plans to make a MetaStorage worldscape you can tour in VR.  It’s just boring.  And at this point there is no desire to build out a massive team and try and take on the world.@@This project came about to solve a problem that they had. I.e. they found themselves holding dozens of very cool NFT’s that were basically worthless until the the market for that project bounced back."
  },
  {
    question: "Who is the Team:",
    answer: "Storage Owner:  Successful entrepreneur, saw an opportunity to solve a problem he faced (and possibly aped into too many NFT projects that dissolved before his eyes).@@Storage Builder: The most sought after Dev in Web3. Works quickly and effectively, starts with security, works backwards to frontend.@@Storage Treasurer: Uses your funds to stake, hedge, leverage, trade, hustle and invest to get enviable returns.@@Community Manager: Doesn’t exist.  We’re a dusty vault.  You store stuff with us.  It gets $Dusty.@@Not everything needs a community manager to rub your belly and reassure you every time you ask the same question."
  },
  {
    question: "Is there a white paper?",
    answer: "You’re reading it."
  },
]