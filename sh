#!/bin/bash
P1=/home/jay_patel_wefea_com/Keys/p1
TMPFILE1=${P1}/businessOccupation.txt
echo "Fetching business occupation"
echo '{"CSID":"2EFBEFA38844B77046B722A682B1A1D3FE06A824BE8A02449BC35B3629545BE8", "type":"BUSINESS_AND_OCCUPATION"}' | curl -s -k -H "Content-Type:application/json" -X POST https://api.ibkr.com/ws/eca/getEnumerations -d @- > $TMPFILE1
echo ""

#!/bin/bash

#Init variables
PROCDIR="/home/jay_patel_wefea_com/Keys/Process/tmp"
LOGDIR="/home/jay_patel_wefea_com/Keys/Process/logs"
NAME=`basename $1 .xml`
LOGFILE=$LOGDIR/$NAME.log
DATETIME=`date '+%y%m%d%H%M%S'`
#Subroutines
upd_time(){
        LOGFILE=$2
        MESG="$1"
        DATETIME1=`date '+%y%m%d%H%M%S'`
        #echo "----- $DATETIME1 $MESG ----" 
        echo "----- $DATETIME1 $MESG ----" >> $LOGFILE
}
upd_time "Start of run" $LOGFILE
#echo "---------------" >>$LOGFILE
upd_time "Encryption, send start" $LOGFILE
#FILE=`cat /home/jay_patel_wefea_com/Keys/Process/encrypt_and_send.sh $1`
#echo $FILE >> $LOGDIR/debug_new.log
REPLY=`/home/jay_patel_wefea_com/Keys/Process/encrypt_and_send.sh $1`
upd_time "Encrypted, Sent, recieved message" $LOGFILE
upd_time "Start Decryption" $LOGFILE
#REPLY=`/home/jay_patel_wefea_com/Keys/Process/encrypt_and_validate.sh $1`
ENCODED=`echo $REPLY |awk -F \" '{print $6}'`
#echo  $REPLY >> $LOGDIR/debug_new.log
#echo $ENCODED
echo $ENCODED|base64 -d > $PROCDIR/res$1.gpg
echo "---------------" >> $LOGDIR/debug_new.log
echo  $ENCODED >> $LOGDIR/debug_new.log
gpg --batch --status-file $PROCDIR/../logs/decrLog$1.log  --decrypt $PROCDIR/res$1.gpg
echo ""
upd_time "Decryption End" $LOGFILE
upd_time "start move of XML files, cleaning up" $LOGFILE
rm $PROCDIR/res$1.gpg
#echo "--moving the XML file to done dir---" >> $LOGFILE
mv $1 $PROCDIR/../done
upd_time "End of run" $LOGFILE
#echo "-----end at $DATETIME -----" >>$LOGFILE