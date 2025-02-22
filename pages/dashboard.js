import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [salary, setSalary] = useState(0);
  const [remainingBudget, setRemainingBudget] = useState(5000);
  const [newExpense, setNewExpense] = useState({ name: "", amount: "" });
  const [newSalary, setNewSalary] = useState(salary);

  const addExpense = () => {
    const amount = parseFloat(newExpense.amount);
    if (!newExpense.name || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid expense name and amount.");
      return;
    }
    if (amount > remainingBudget) {
      alert("Warning: Expense exceeds your remaining budget!");
      return;
    }

    const updatedExpenses = [...expenses, { id: expenses.length + 1, name: newExpense.name, amount }];
    setExpenses(updatedExpenses);
    setRemainingBudget(remainingBudget - amount);
  };

  const updateSalary = () => {
    setSalary(newSalary);
    setRemainingBudget(newSalary - expenses.reduce((sum, exp) => sum + exp.amount, 0));
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold text-black">Total Budget</h2>
        <input
          type="number"
          value={newSalary}
          onChange={(e) => setNewSalary(Number(e.target.value))}
          className="border p-2 mt-2 w-full rounded text-black"
        />
        <button onClick={updateSalary} className="mt-2 p-2 bg-green-600 text-white w-full rounded text-black">
          Update Budget
        </button>
        <p className="mt-4 text-lg text-red-500 text-red">Total: ${salary}</p>
        <p className="text-lg text-red-500 text-red">Remaining: ${remainingBudget}</p>
      </div>

      <div className="bg-white p-6 shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold text-black">Expenses</h2>
        <ul className="mt-2">
          {expenses.map((exp) => (
            <li key={exp.id} className="border p-2 mt-1 rounded bg-gray-50 text-black">
              {exp.name}: ${exp.amount}
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Expense Name"
            value={newExpense.name}
            onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
            className="border p-2 w-full rounded text-black"
          />
          <input
            type="number"
            placeholder="Amount"
            value={newExpense.amount}
            onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
            className="border p-2 w-full mt-2 rounded text-black"
          />
          <button onClick={addExpense} className="mt-2 p-2 bg-blue-600 text-white w-full rounded">
            Add Expense
          </button>
        </div>
      </div>

      <div className="bg-white p-6 shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold text-black">Expense Breakdown</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={expenses} >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#4F46E5" data={expenses} className="border p-2 w-full mt-2 text-blue"/>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
