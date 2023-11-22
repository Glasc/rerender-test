import { useState } from "react"

function addLeadingZero(digit: number) {
  // Convert the digit to a string
  let digitString = digit.toString()

  // Check if the length is 1 (single-digit number)
  if (digitString.length === 1) {
    // Add a leading zero
    digitString = "0" + digitString
  }

  return digitString
}
const getInitialState = (amount: number) => {
  const initialState: {
    [key: string]: string
  } = {}
  for (let i = 0; i < amount; i++) {
    initialState[i] = ""
  }
  return initialState
}
export const Form = () => {
  const [amount, setAmount] = useState<number>(10)
  const [inputValue, setInputValue] = useState(getInitialState(amount))

  return (
    <div>
      <form>
        <label className="text-2xl font-semibold" htmlFor="amount">
          Amount:{" "}
        </label>
        <input
          className="border-2 font-bold px-1 border-[rgb(218,216,206)]"
          type="text"
          name="amount"
          id="amount"
          value={amount}
          onChange={(e) => {
            let newAmount = Number(e.target.value)
            if (isNaN(Number(e.target.value))) {
              return
            }
            newAmount = Math.max(1, newAmount)
            setAmount(newAmount)
            setInputValue(getInitialState(newAmount))
          }}
        />
      </form>
      <form className="flex gap-2 flex-wrap mt-4">
        {Object.keys(inputValue).map((key) => {
          return (
            <div key={key}>
              <label className="text-xl" htmlFor={key}>{addLeadingZero(Number(key) + 1)}: </label>
              <input
                className="border-2 text-xl px-1 border-[rgb(230,228,217)]"
                type="text"
                id={key}
                name={key}
                value={inputValue[key as keyof typeof inputValue]}
                onChange={(e) => {
                  setInputValue({
                    ...inputValue,
                    [key]: e.target.value,
                  })
                }}
              />
            </div>
          )
        })}
      </form>
    </div>
  )
}
