import fileDownload from 'js-file-download';
import { FunctionComponent, useEffect, useState } from 'react';
import { AiOutlineCloudDownload } from 'react-icons/ai';

import { useRedirect } from '../../../hooks/useRedirect';
import { useToastify } from '../../../hooks/useToastify';
import { TransactionsService } from '../../../models/resources/transactions/transactions.service';
import { Colors } from '../../../types/enums/Colors';
import { Currencies } from '../../../types/enums/Currencies';
import { Warnings } from '../../../types/enums/Warnings';
import { Profile } from '../../../types/model/Profile';
import { Transaction as TransactionModel } from '../../../types/model/Transaction';
import { Gem } from '../../elements/gem/gem';
import { Loading } from '../../modules/loading/loading';

import style from './transactions.module.scss';

interface Props {
  profile?: Profile;
}

const Transactions: FunctionComponent<Props> = ({ profile }) => {
  const { toastError } = useToastify();
  const { warningRedirect } = useRedirect();

  const [transactions, setTransactions] = useState<TransactionModel[]>();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const res = await TransactionsService.getAllTransactionsFromUser();
        setTransactions(res);
      } catch (e) {
        toastError();
      }
    };

    if (!profile) {
      warningRedirect('/', Warnings.NEED_TO_LOGIN);
    }

    Promise.all([getTransactions()]).finally(() => setLoaded(true));
  }, [loaded]);

  const downloadPdf = async (transactionId: string) => {
    const data: any = await TransactionsService.getTransactionPdf(transactionId);

    const blob = new Blob([data], { type: 'application/pdf' });

    fileDownload(blob, `facture-${transactionId}.pdf`);
  };

  if (!loaded) {
    return <Loading />;
  }

  return (
    <>
      {transactions && (
        <main className={style.main}>
          <div className={style.transactions}>
            <h1 className={style.transaction__title}>Mes factures</h1>

            <div className={style.transactions__container}>
              {transactions.length ? (
                transactions.map((transaction: TransactionModel) => (
                  <div className={style.transaction}>
                    <p className={style.transaction__id}>Facture n°{transaction.transactionsId}</p>
                    <p className={style.transaction__date}>{transaction.date}</p>
                    <div className={style.transaction__price}>
                      <span>{transaction.price}</span>
                      {transaction.currency === Currencies.gem ? (
                        <Gem className={style.transaction__gem} color={Colors.black} />
                      ) : (
                        <span>€</span>
                      )}
                    </div>

                    <AiOutlineCloudDownload
                      className={style.transaction__icon}
                      onClick={() => downloadPdf(transaction.transactionsId)}
                    />
                  </div>
                ))
              ) : (
                <p className={style.transactions__empty}>Vous n'avez pas de factures</p>
              )}
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export { Transactions };
