��- -   A l t e r T a b l e 
 
 A L T E R   T A B L E   " c a r "   A D D   C O L U M N           " c r e a t e d _ a t "   T I M E S T A M P ( 3 )   N O T   N U L L   D E F A U L T   C U R R E N T _ T I M E S T A M P ; 
 
 
 
 - -   A l t e r T a b l e 
 
 A L T E R   T A B L E   " r e f u e l "   A D D   C O L U M N           " d i s t a n c e "   I N T E G E R   N O T   N U L L ; 
 
 
 
 - -   C r e a t e I n d e x 
 
 C R E A T E   U N I Q U E   I N D E X   " c a r _ n a m e _ o w n e r _ i d _ k e y "   O N   " c a r " ( " n a m e " ,   " o w n e r _ i d " ) ; 
 
 
 
 