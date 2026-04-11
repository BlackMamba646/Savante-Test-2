import { useEffect, useState } from 'react';

type useMortgageCalculatorProps = {
	initialValue?: string;
	amount: string;
	interestRate: string;
	loanTerm: string;
	downPayment: string;
};

const INITIAL_CALCULATOR: useMortgageCalculatorProps = {
	initialValue: '',
	amount: '',
	interestRate: '',
	loanTerm: '',
	downPayment: '',
};

export const useMortgageCalculator = (props: useMortgageCalculatorProps = INITIAL_CALCULATOR) => {
	const { amount, downPayment, interestRate, loanTerm } = props;

	const [monthlyPayment, setMonthlyPayment] = useState<string | null>(null);
	const [totalPayable, setTotalPayable] = useState<string | null>(null);
	const [totalInterest, setTotalInterest] = useState<string | null>(null);
	const [totalLoanAmount, setTotalLoanAmount] = useState<string | null>(null);
	const [totalDownPayment, setTotalDownPayment] = useState<string | null>(null);

	useEffect(() => {
		(function () {
			if (!amount || !interestRate || !loanTerm) {
				setMonthlyPayment('');
				return;
			}

			const getDownPayment = (parseFloat(amount) * parseFloat(downPayment)) / 100;
			setTotalDownPayment(String(getDownPayment));

			const loanAmount = parseFloat(amount) - (getDownPayment ? getDownPayment : 0);
			setTotalLoanAmount(String(loanAmount));

			const r = parseFloat(interestRate) / 100 / 12;
			const n = parseFloat(loanTerm) * 12;

			const numerator = loanAmount * r * Math.pow(1 + r, n);
			const denominator = Math.pow(1 + r, n) - 1;

			const monthlyPayment = (numerator / denominator).toFixed(2);
			setMonthlyPayment(monthlyPayment);

			const totalPayable = (+monthlyPayment * n).toFixed(2);
			setTotalPayable(totalPayable);

			const totalInterest = (+totalPayable - loanAmount).toFixed(2);
			setTotalInterest(totalInterest);
		})();
	}, [amount, interestRate, loanTerm, downPayment]);

	return {
		monthlyPayment,
		totalPayable,
		totalInterest,
		totalLoanAmount,
		totalDownPayment,
	};
};