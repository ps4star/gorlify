const rTable = [
	"girl", "gorl",
	"situation", "situation type deal",
	"hater", "haydur",
	"earring", "eareen",
	"immobile", "wearing the wrong shoes",
	"hungry", "hongry",
	"fat", "swollen",
	"literally", "lidurally",
	"i can't", "I have a heel spur",
	"becky", "BECKEEEEEEYYYUUHHHH",
	"optavia", "octivia",
	"kimono", "kameeno",
	"mukbang", "mook-bong",
	"fake", "hootenberry",
	"lie", "lah",
	"much sodium", "many sodiums",
	"cheese", "chease",
	"pieces of bacon", "bacons",
	"destiny", "density",
	"weight loss", "weight gain",
	"wal[\-]*mart", "wommart",
	"wreath", "reef",
	"night(\-| )*time", "darktime",
	"moment", "molment",
	"windchime[s]*", "jangly loud thing",
	"rape", "rain and petals eavesdrop, I used the wrong word",
	"napkin holder is empty", "napkin holder is all like no-napkiney",
	"standing", "standed",
	"realize", "rillize",
	"meal", "mill",
	"selling", "saileen",
	" big ", "BIG?? ARE YOU CALLING ME BIG??"
]

function doTextReplace(txt) {
	for (let i = 0; i < rTable.length; i += 2) {
		txt = txt.replace(new RegExp(`${rTable[i]}`, "gi"), rTable[i + 1])
	}
	return txt
}

const docEls = document.getElementsByTagName('*')

function doRep(els) {
	for (let i = 0; i < els.length; i++) {
		const el = els[i]

		for (let j = 0; j < el.childNodes.length; j++) {
			const node = el.childNodes[j]

			if (node.nodeType === 3) {
				const text = node.nodeValue
				const replacedText = doTextReplace(text)

				if (replacedText !== text) {
					el.replaceChild(document.createTextNode(replacedText), node)
				}
			}
		}
	}
}

doRep(docEls)

// const observer = new MutationObserver((ml, observer) => {
// 	ml.forEach(mut => {
// 		doRep(document.getElementsByTagName(mut.target.nodeName.toLowerCase()))
// 	})
// })

// observer.observe(document.body, {
// 	subtree: true,
// 	attributes: true,
// 	childList: true,
// })