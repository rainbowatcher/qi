import { beforeAll, bench, describe } from "vitest"
import init, { format } from "../packages/qi-js"
// eslint-disable-next-line antfu/no-import-dist
import { format as legacyFormat } from "../packages/qi-js-legacy/dist/index.js"

beforeAll(async () => {
    await init()
})

// test case from blog: https://antfu.me/posts/mental-health-oss-zh
describe("short", () => {
    const str = "abc你好，世界123"
    bench("qijs format", () => {
        format(str)
    }, {
        time: 1000,
        warmupTime: 500,
    })

    bench("legacy format", () => {
        legacyFormat(str)
    }, {
        time: 1000,
        warmupTime: 500,
    })
})

describe("long", () => {
    const str = "当我开始我最初的几个开源项目时，我非常兴奋。我会不断刷新页面，急切地等待新的issue、pullrequest和评论的出现。每一个star都会让我开心，我也会尽我所能去解决每一个issue。我设定了诸如获得100颗star、500颗star等里程碑，每当达成这些目标时我都会为此庆祝。我仍然清楚地记得，当我向我的朋友介绍我的项目获得了几百颗星星而对这个世界产生了一些影响时，我是多么自豪。"
    bench("qijs format", () => {
        format(str)
    }, {
        time: 3000,
        warmupTime: 1000,
    })

    bench("legacy format", () => {
        legacyFormat(str)
    }, {
        time: 3000,
        warmupTime: 1000,
    })
})


describe("real document", () => {
    const str = "今年是我开始做开源的第四年。说实话，我越来越频繁地感觉到许多事情超出我的能力范围。我仍然不确定自己是否曾经真正经历过burnout（职业倦怠），但我确实周期性地感受到生产力和积极性的起伏。这篇文章并不是一篇指南，也算不上是抱怨。它更像是我用来自我记录的个人日记。我只是觉得，如果能与你们分享这些内容，也许会很有意思。如果你正在经历职业倦怠或者感觉快要接近这个状态，我建议你休息一下、和其他人聊聊，并在必要时寻求专业帮助。此外，你也可以参考为开源维护者保持平衡这篇优质的文章。照顾好自己！现在，就让我聊聊我近期的一些零碎的思考吧。措手不及#从某种意义上说，即使是今天，开源对我来说仍然是一个非常新且未知的领域。自从我开始学习编程和了解开源，我就一直梦想着成为一名全职的开源开发者。在大学期间，我怀着被开源社区认可的渴望，不断寻找自己能参与的有重大影响力的项目。突然之间，你会迎来一个转折点，你的项目可能会出乎意料地获得成功，或者被邀请加入一个重量级项目。在那一刻，所有的激动和随之而来的责任感突然涌上心头。几天后，当最初的兴奋感逐渐消散，你开始意识到这还意味着巨大的责任和许多你之前未曾考虑过的事情。虽然我在大学期间一直努力跻身开源界，但当我真正踏入这一领域时，才发现自己有多么的措手不及。关于开源有趣的一点是你可能永远不会准备好。你可能会遇到棘手的技术问题，或者需要不断追赶新兴技术的脚步，但除了编码之外，还会有许多其他事情需要你去应对。你要成为客服去解答问题；成为设计师、作家去编写一份精美的文档；成为项目经理确保项目正常推进；成为团队领导来接纳新的贡献者并保持团队的积极性；推广你的作品；在大会上发表演讲；等等。这些都是作为开源开发者的「额外影响」，不仅仅是代码，很多其他事情也会随之而来。对我来说，这是一个巨大的挑战。我是一个相当内向的人，我不擅长聊天或交谈。我在学校时，英语成绩很差，也没有说英文的自信。我非常怯场，即便只是在同学面前，我也会非常紧张。我想我也不喜欢团队管理，尽管我从未真正领导过一个团队——有太多事情值得害怕。但现实并不会给你充足的时间去做好充足的准备（或者从另一方面来看，如果不迈出第一步，你可能永远不会准备妥当），随着项目的发展，你的职责也随之增加，你会被迫学习和适应。当它自然地成长为一个团队时，你就得学会沟通，学会领导。当有人邀请你做播客或者演讲时，他们不会等你三年时间来练习语言或演讲技巧——你要么错过机会，要么就面对恐惧向前进。因为我对开源的热爱，我必须战胜自己、克服恐惧。这些事情可能看起来难以应对，但如果你逐一接受并克服这些挑战，你可能会慢慢发现，这些经历其实是相当有趣且充满回报的。事到如今，我非常感激曾经的这些机会，它们促使我走出舒适区，迫使我进步。在做开源的这四年里，尽管我在很多方面仍不尽完美，但我能够更加自信流利地说英语了；我在许多研讨会上演讲，有些会议的参与者甚至达到了数千人，每次演讲前，我仍然会感到非常紧张，但至少我不再害怕上台了。未来还有很多挑战和惊喜在等着我。我既感到忐忑不安，又充满期待。这里我很喜欢JonyJ的《山脚》中所描述的感觉，有兴趣的话可以去听听。「期望」#人类具有很强的适应能力。这驱使人类得以生存并不断进步，但同时，也让我们变得难以满足。当我开始我最初的几个开源项目时，我非常兴奋。我会不断刷新页面，急切地等待新的issue、pullrequest和评论的出现。每一个star都会让我开心，我也会尽我所能去解决每一个issue。我设定了诸如获得100颗star、500颗star等里程碑，每当达成这些目标时我都会为此庆祝。我仍然清楚地记得，当我向我的朋友介绍我的项目获得了几百颗星星而对这个世界产生了一些影响时，我是多么自豪。但一旦你达成了这些目标，事情就开始变得「理所当然」。随后，你将期望更多，设立更高的目标。到达某个时间点，我开始对star或下载量这类数字不再那么关心。这未必是件坏事，毕竟这并非是我们真正应该关注的指标，但我偶尔还是会怀念那些能从简单的事物中找到快乐的日子。我逐渐意识到，我们生活中的许多事情的经历与我们的期望有直接关系。在起步阶段，我们的预期不高，也相较容易实现。随着我们不断进步，站在更高的平台上时，我们开始抱有更高的期望。然而，这些期望往往不会按比例线性增长。当你拥有了1000颗star时，再增加100个star可能不会像最初什么都没有时那么令人深刻。当你有1000颗star时，你会寻找另外的1000颗，而仅仅100颗已经不能满足你了。这对我来说很奇怪，我不喜欢我自己的这种「生物本性」。我发现降低自己的期望，并对所拥有的一切心存感激，是保持快乐的一个有效方式。当你意识到自己无法不断实现一个又一个目标时，最好的出路就是停止追求更高的成就，暂时休息一下，欣赏周遭的景色——你可能会发现自己其实已经达到了足够的高度。自从我开始不再过分关注得失后，我发现自己更乐于去尝试各种不同的想法，哪怕它们可能不会成功——因为我对它们没有过高的期望，所以在我看来根本不存在「失败」这回事。如果它们中有一些最终获得了成功，那将成为一份不错的「惊喜」。如果你对此感兴趣，我在「关于YakShaving」一文中阐述了我的寻找想法的过程。「自我期望」#期望不仅关乎我们所做的事情，同样也关乎我自己。当我对某个项目过分在意时，我常常会发现我对扮演「善良且友好的维护者」这一角色的自我期望过高。每当我看到别人批评我的项目，或是某个bug给人带来困扰，亦或是我没有及时回复issue等诸如此类的事情时，我会感到沮丧。这在那些广受欢迎的项目上，这种感觉尤为强烈，正因为我知道有许多人正依赖着它。这些对自己的期望也给我带来了相当大的压力。正如我在另一篇文章中提到的，维护者与用户的比例在开源项目中通常是不平衡的。找到一个新的贡献者或团队成员非常困难，但由于开源天然免费，吸引更多用户却几乎没有门槛。开源软件通常是「以现状提供」的，这意味着维护者并没有义务为他人解决问题。我想这对维护者来说，也会是一个困难的思维转换，尤其是对于那些关心用户和社区的维护者。当我们收到新的issue时，很难置之不理。但从另一个角度来看，一个人的时间和精力是有限的。当工作量超出了一个人的能力时，设定优先级，优先关注最重要的事情是其实会更好的做法。我希望有人能在我最开始维护高流量的开源项目时告诉我这一点（在网上其实有不少很好的资源，比如这篇文章）——我花了很长时间才意识到，我不必做多完美，很多事情做不到也没有关系，而我应该找到自己的做事节奏。与其接收通知被动地处理，更适合我的其实是关闭通知，在自己适合的时间再去主动查看和处理issues和pullrequest。如果你对此感兴趣,我曾做过一个关于「我如何管理GitHub通知」的演讲。降低对自己的期望——没有人是完美的，也没有人是不会累的机器。不要让它们成为你的心理负担。保持健康和可持续的节奏，让自己保持快乐和积极性，长远来看会产生更多积极的影响。当梦想成为工作#生活在自己的梦想中很棒，老实说，甚至是一种特权。但从现实角度来说，怀揣梦想与梦想成为现实生活之间存在着巨大的差异。梦想总是被理想化的，忽视了所有那些枯燥乏味的细节。我的梦想是成为一名全职的开源开发者。没错，独立工作、做自己喜欢的事情、自由安排时间、可以在任何地方工作、造福世界等等，这一切听起来都很美好。可是世界并没有这么简单。这与「把你的爱好变成工作」非常相似。它确实有很多好处，例如你会更加享受工作并且更有动力。但其实，这也伴随着许多义务和责任。当一个爱好变成一份工作时，你失去了选择什么时候做什么的自由。以前，你会把你的爱好作为工作后的放松，但现在，当你想通过爱好来放松时，它们反倒变成了工作。我很幸运，软件开发是一个广阔的领域，有很多不同的事情可以做。除了主要的开源项目维护之外，我有时会做一些小项目（GenerativeArt，StableDiffusion，一些小实验，等等）来放松一下我的大脑（相对于主要项目的一种「放松」）。我也很喜欢玩独立游戏，同时我一直在考虑认真地开发一些游戏——不过那是另外一个话题了——至少现在，当我真的想远离代码时，我还有不少逃避的方法。可能是我太喜欢编程了，以至于我对这件事并没有强烈的感觉。对我而言，「工作」和「娱乐」的界限是相当模糊的。有时，一个最开始以娱乐为初衷的项目最终也可能演变成一个大家都依赖的重要项目。速度、规模和品质#其实这个主题才是这是驱使我写这篇博客文章最初的原因。让我们从这个速度（Velocity）、规模（Scope）和品质（Quality）的「铁三角」开始。(通常它们是品质/速度/成本，我在这里做了一些调整)速度-规模-品质铁三角通常，人们会说-在这三个因素中，你只能选择两个。如果你想更快地交付一个项目，你可能不得不在品质上做出妥协，或者缩减产品功能。而如果你想拥有一个高质量和功能丰富的产品，那么你可能需要牺牲交付速度，慢慢打磨出优质的成果。以我个人的标准，保持开源软件的高品质是我绝对不会妥协的准则。同时，保持一定的速度和惯性对我来说也非常重要。我的大部分动力来自于完成某件事后的成就感。若我能够创建迭代事物然后交付的反馈循环，我便能进入一种极佳的心流状态中。因此，我通常选择品质和速度。起初，我的项目规模相当明确且较小。我设法在保持高品质的同时，快速交付，快速从社区中获得反馈。那时，我能够保持高效和积极性，持续推进这些项目。范围#我「出乎意料地」保持了这种势头和速度相当长一段时间。我从i18nAlly和VueUse开始接触开源，自那以后，我加入了Vue和Vite团队。在2021年一年之中，我做出了Slidev(2021年4月)、UnoCSS(2021年10月)和Vitest(2021年12月)—一切都进行得太顺利了，以至于我几乎没有意识到拥有更大规模的项目也是会有上限的。从那时起，我继续「无知地」保持着这样的速度。我非常幸运能够遇到这些了不起的团队和社区，并从他们那里得到帮助：非常厉害的Nuxt团队ATINUXDANIELROEPI0SHEREMET-VAARIPERKKIO和Vitest团队持续维护VitestCHU121SU12ZYYV和UnoCSS团队推动UnoCSS的很多改进OKXIAOLIANG4WHEATJSALFRED-SKYBLUETAHUL和VueUse团队协助维护VueUseSXZZ管理UnpluginKERMANXTONAI在Slidev上推动了很多功能ARASHSHEYDA在NuxtDevTools上提供了很多帮助SHUUJI3SHINIGAMI92为Elk做出了贡献PATAK-DEVSAPPHI-REDBLUWY与出色的社区一起推动Vite前进USERQUIN维护VitePWA并几乎在所有项目中提供了帮助YYX990803，我从他那学到了很多关于开源和决策的智慧…以及许多为开源做出贡献或通过赞助提供财务支持的人！很遗憾我没法一一列举出所有人，很多人也实际上在多个项目中有所交集。我想说的是，我并非孤军奋战，也不可能独自承担所有工作。我从社区和团队那里借到了很多帮助才能完成这些。我对此深表感激。除了品质和速度之外，似乎我也做到了不错的规模——这看起来好像打破了铁三角的规则——但实际上，在幕后的社区才是使这一切成为可能的「魔法」。能力范围#维护多个高流量的开源项目所需的工作量实际上是巨大的。没有社区的帮助，我理应早就达到了我的极限。尽管社区给了我很多帮助，但是，沟通、协调以及切换上下文仍然需要耗费我大量精力。时间一长，我需要处理的事情越积越多，想要尝试的新点子和待改善的地方也不断增加。我想让这些项目保持活力并持续发展；我想写更多的博客文章来分享我的想法；我想做更多的演讲，去旅行，和很多人见见面；我想做更多的直播，因为我知道很多人还在催更；我必须得处理完这个事情，才能进行那个发布；我也想学法语；也想抽出更多的时间和家人在一起——我的意思是，这或许就是生活。每个人都有自己的忧虑和责任，我并没有比其他人更加特别或忙碌。「但不知怎么的，好像有些东西，让我喘不过气。」我可能不愿意承认我潜在的倦怠（burnout）。这并不是因为我害怕，而是我不想轻言放弃，也不想被动地去应对。我知道该休息时就要休息，但称自己为「倦怠」并放弃对我来说像是一种「逃避责任」的「捷径」。我想找出「rootcause」（根本原因），并尝试改善情况，而不仅仅是「workaround」（临时应对）。正如我们之前讨论的，对「期望」的转变，重新审视自己的「措手不及」和「自我期望」，是我在面对因不同原因的倦怠时的解决方案。通过自我调整和适应，我通常能在大约一周的时间内走出低谷，并继续前进。这次的情况有点不同，原因并不是我缺乏动力，而是因为我想做的事情太多了，而超出了我的能力范围。我开始思考，或许问题在于我总是抱着保持速度并且不断交付成果的这种期望，我对做得不够和做得不快感到焦虑。快速获得反馈是很棒，也很高效，但我可能因为太习惯于快速而变得有些容易没有耐心。这些因素叠加在一起，当我在做一些需要中长期努力的事情时，我变得容易感到焦虑。例如，写作。我不擅长写作，而且说实话我也并不喜欢写作。文档、博客文章、教程和演讲——都需要耗费大量时间，但我又不得不做。当我在写作时，我很容易失心和分神，甚至中途放弃。所以我在Twitter上询问了一下大家的做法，得到了社区的很多很好的建议（你可以看看评论，说不定对你来说也会有所帮助）。我开始尝试放轻松，慢慢地做，试图转变我的思维，不急于求成，享受过程。你正在阅读的这篇博客大约花了我一周的时间来写（对我来说这是相当长的时间），分成了多个阶段来完成。这也帮助我重新审视和梳理我的思想和感受，实际上，把它们写下来也减轻了我不少的焦虑感。因此，我想我应该重新审视一下自己的能力范围和期望。我得明白并接受一个事实：我不可能始终以这样的速度前进，也没必要对自己过于严苛。放缓步伐，更细致地打磨每一个细节，也许我能在这个过程中找到别样的快乐和满足感。老实说，我并不确定我在这篇博客文章中想要表达什么——也许只是简单地与你分享我的想法和感受。现在，我仍然感到相当大的压力。我仍在适应和努力寻找更好的处理方式。通过这一周的写作和与朋友交谈，我感觉好多了，我相信我会度过这个难关。这可能就像我们生活中的许多其他事情一样：我们并不总是有完美的解决方案，但我们必须得继续前进，找到出路。对于每个开源项目维护者来说，保持良好的心理健康是实现长期可持续发展的关键。在整个旅程中，我不认为会有一个绝对的「答案」或「解决方案」。这更像是一个持续的学习和适应的过程，需要我们自己去寻找适合我们自己的方法。我很想听到你的想法#感谢你能耐心地把我这杂乱冗长的心情读到最后！我知道我的观点一定是非常主观且具有偏差的。如果这篇文章引发了你的一些想法或感受，我很想听听你的想法或你的方法。你可以在这篇推文或mastodon下评论，如果你更喜欢私下交流，也可以发邮件到hi@antfu.me。另外，关于开源，还有很多方面值得讨论，而我在这篇文章里没有机会提及。ArtemZakharchenko写了一篇很有趣的文章「开源的黑暗面」，他从不同的角度和观点出发，我也非常认同。强烈推荐你也读一读。致谢#最后，我要特别感谢我的女朋友Inès，她一直从始至终陪伴我度过每一个艰难的时刻。如果没有她的支持，我的开源之路也许不会走到今天。此外，感谢PATAK-DEV和POSVA对这个话题的深入交流，他们真的帮了我很多，提供了很大的支持。还有正在阅读这篇文章的你，以及整个开源社区！我非常感激你们给我的所有帮助和支持。下次再见，保重！"
    bench("qijs format", () => {
        format(str)
    }, {
        time: 5000,
        warmupTime: 3000,
    })

    bench("legacy format", () => {
        legacyFormat(str)
    }, {
        time: 5000,
        warmupTime: 3000,
    })
})
